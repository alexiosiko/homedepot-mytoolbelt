import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const articleNum = req.nextUrl.searchParams.get("bayId");
  if (!articleNum) {
    return NextResponse.json(
      { message: "Article number is null" },
      { status: 400 }
    );
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
    });
    const page = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.homedepot.ca/product/${articleNum}`;
    console.log("Scraping URL:", url);
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the specific dynamic element to appear
    const selector = ".hdca-product__description-pricing-price-value";
    await page.waitForSelector(selector, { timeout: 10000 }); // 10-second timeout

    // Extract content from the dynamic element
    const price = await page.evaluate((sel) => {
      return document.querySelector(sel)?.textContent?.trim();
    }, selector);

    // Close Puppeteer
    await browser.close();

    // Return the extracted content
    return NextResponse.json({ price }, { status: 200 });
  } catch (error: any) {
    console.error("Error during scraping:", error.message);
    return NextResponse.json(
      { message: "Failed to scrape data", error: error.message },
      { status: 500 }
    );
  }
}
