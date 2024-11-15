import { dbPromise } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	try {
		const bayId = req.nextUrl.searchParams.get("bayId");
		if (!bayId)
			throw Error("BayId params is null");

		const db = await dbPromise();
		const bool = await db.dropCollection(bayId);
		if (!bool)
			throw Error("Error dropping collection");


		return NextResponse.json({ message: "hihi"}, { status: 200 });
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ message: "Error deleting bay"}, {status: 500 });
	}
}
export async function GET() {
	try {
		const db = await dbPromise();

		const bays = await db.listCollections().toArray();
		let bayIds = bays.map(bay => bay.name);
		bayIds = bayIds.filter(bayId => bayId != "dummy");
		return NextResponse.json({ bayIds: bayIds, message: "Found bays."}, { status: 200 });

		
	} catch (e: any) {
		return NextResponse.json({ bays: e.message, message: "Error getting bays."}, { status: 500 });

	}
}


export async function PUT(req: NextRequest) {
	const { bayId, articles } = await req.json();
	try {
		const db = await dbPromise();
		const collection = db.collection(bayId);
		if (articles)
		await collection.deleteMany({}); // Delete all
		await collection.insertMany(articles) // Insert all
		return NextResponse.json({ articles: articles, message: "Updated bay." }, { status: 200 });

	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ message: e.message} , { status: 500 });
	}
}