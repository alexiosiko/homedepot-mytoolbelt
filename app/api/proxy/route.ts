import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const url = req.nextUrl.searchParams.get('url');
		if (!url) {
			console.error("Missing url");
			return NextResponse.json(
			{ message: "Missing 'url' query parameter" },
			{ status: 400 }
			);
		}
		console.log(url);
		const response = await axios.get(url, { timeout: 1500 })
		return NextResponse.json(response.data, { status: 200 });
	} catch (error: any) {
		console.error("Error making proxy request:", error.message);
	
		return NextResponse.json(
		{ error: "Failed to fetch data from the target URL", details: error.message },
		{ status: 500 }
		);
	}
}