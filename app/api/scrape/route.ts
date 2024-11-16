import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
		const url = req.nextUrl.searchParams.get('url');
	if (!url) {
		return NextResponse.json(
		{ error: "Missing 'url' query parameter" },
		{ status: 400 }
		);
	}
	try {
		// Launch Puppeteer with necessary flags
		const browser = await puppeteer.launch({
		  headless: true,
		  args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-accelerated-2d-canvas",
			"--disable-gpu",
			"--disable-http2",
		  ],
		});
	
		const page = await browser.newPage();
	
		// Set User-Agent to mimic a real browser COPIED THIS CODE
		await page.setUserAgent(
		  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
		);
		await page.goto(url, {
		  waitUntil: "domcontentloaded",
		});
	
		// Evaluate data on the page
		const data = await page.evaluate(() => {
		  const productName = document
			.querySelector(".hdca-product__description-title-product-name")
			?.textContent?.trim();
		  return { productName };
		});
	
		console.log("Scraped Data:", data);
	
		// Close the browser
		await browser.close();
	
		return NextResponse.json({ data }, { status: 200 });
	  } catch (error: any) {
		console.error("Error making proxy request:", error.message);
	
		return NextResponse.json(
		  {
			error: "Failed to fetch data from the target URL",
			details: error.message,
		  },
		  { status: 500 }
		);
	  }
}

const selectors = {
	productName: ".hdca-product__description-title-product-name",
	price: ".price-value",
	description: ".product-description",
	imageUrl: ".product-image img",
	availability: ".availability-status",
  };
  