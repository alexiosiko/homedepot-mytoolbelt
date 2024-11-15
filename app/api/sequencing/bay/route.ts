import { dbPromise } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const bayId = req.nextUrl.searchParams.get("bayId") as string | null;
		if (!bayId)
			throw Error("Api param bayId is null");
		const db = await dbPromise();

		// Check if the collection exists
		const collections = await db.listCollections({ name: bayId }).toArray();
		if (collections.length === 0) {
			// Optionally create the collection
			await db.createCollection(bayId);
			console.log(`Collection '${bayId}' created.`);
		}
		
		const collection = db.collection(bayId);
		const articles = await collection.find({}).toArray();

		return NextResponse.json({ articles: articles, message: "Found bay." }, { status: 200 });
	
	} catch (e: any) {
		console.error(e);
		return NextResponse.json({ message: e.message} , { status: 500} );
	}
}