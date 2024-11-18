import { ScrapedData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");
    if (!url) {
		return NextResponse.json(
			{ error: "Missing 'url' query parameter" },
            { status: 400 }
        );
    }
    try {
		const browser = await puppeteer.launch({
			headless: true,
        });
		
        const page = await browser.newPage();
        await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
        );

		// Go to website and wait until data is loaded and scrape using puppeteer
        await page.goto(url, { waitUntil: "domcontentloaded" });

		const scrapedData = await page.evaluate((config) => {
			const result: Record<string, string | null> = {};
			console.log("Here inside browser context");
			for (const [key, selector] of Object.entries(config)) {
				const element = document.querySelector(selector as string);
				if (!element) 
					console.log(`Element not found for selector: ${selector}`);

				result[key] = element?.innerHTML ?? null;
			}
			return result;
		}, scrapeConfig);

		console.log("Scraped data: ", scrapedData);
        await browser.close();
		
        return NextResponse.json({ ...scrapedData }, { status: 200 });
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



// List of classes you want to scrape
const scrapeConfig: ScrapedData = {
	skuLine: ".hdca-product__description-product-detail-sku",
	manufactureName: ".hdca-product__description-title-manufacturer",
	productName: ".hdca-product__description-title-product-name",
	price: ".hdca-product__description-pricing-price-unit",
	description: ".acl-my--x-small.hdca-text-body--small",
	stock: ".product-localized-find-in-store-container",
	modelLine: ".hdca-product__description-product-detail-model",
	ratingNumber: ".acl-rating__reviews",
};