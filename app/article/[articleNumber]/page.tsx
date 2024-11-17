"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { PricingAndDataType, ProductData } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import axiosRetry from 'axios-retry';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rating } from 'react-simple-star-rating'
import { useRouter } from "next/navigation";



export default function Page({
		params,
	}: {
	params: Promise<{ articleNumber: string }>
}) {
	const router = useRouter();
	const [productData, setProductDAta] = useState<ProductData | null>(null); // productdataexmaple)
	const [pricingAndStockData, setPricingAndStockData] = useState<PricingAndDataType | null>(null); // ;exmapleprincingandstockdata);
	
	// This is the axios retry library that automatically retries an axios 
	// request if failed x amount of times. I needed this because the homedepots
	// product API sometimes blocks my request.
	axiosRetry(axios, {
		retries: 5,
		retryDelay: axiosRetry.exponentialDelay, // Exponential backoff delay between retries
		retryCondition: (error: any) => {
			return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status != 200;
		},
	});

	const fetchProductData = async (articleNumber: string) => {
		try {
			const url = `https://www.homedepot.ca/api/productsvc/v1/products/${articleNumber}/store/7047`;
			const res = await axios.get(`/api/proxy`, { params: { url } });
			const productData: ProductData = res.data;
			console.log(productData);
			setProductDAta(productData);
		} catch (e: any) {
			console.error('Error fetching product data:', e.message);
			toast({
				title: 'Error fetching product data',
				description: e.message,
				variant: 'destructive',
			});
		}
	};

	const fetchPricingAndStockData = async (articleNumber: string) => {
		try {
		const url = `https://www.homedepot.ca/api/fbtsvc/v1/fbt/products/${articleNumber}/store/7047?checkStockAndPrice=true&lang=en`;
		const res = await axios.get(`/api/proxy`, { params: { url } });
		const pricingAndStockData: PricingAndDataType = res.data;
		// Process the pricingAndStockData as needed
		setPricingAndStockData(pricingAndStockData);
		console.log(pricingAndStockData);
		} catch (e: any) {
		console.error('Error fetching pricing and stock data:', e.message);
		toast({
			title: 'Error fetching pricing and stock data',
			description: e.message,
			variant: 'destructive',
		});
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const articleNumber = (await params).articleNumber
			fetchProductData(articleNumber);
			fetchPricingAndStockData(articleNumber);
		}
		fetchData();
	}, []);
	
	const anchorArticle = pricingAndStockData?.anchorArticle;

	return (
		<div>
			<div className="flex max-sm:flex-col justify-center gap-4">
				<div className="flex flex-col gap-2">
					{anchorArticle ? <p className="text-lg font-semibold">{anchorArticle.name}</p> : <Skeleton className="h-10 w-24" /> }
					<div className="flex gap-2">
						{anchorArticle ? <p className="text-xs">SKU: {anchorArticle?.code}</p> : <Skeleton className="h-4 w-32" />}
						{anchorArticle ? <p className="text-xs">Model: {anchorArticle?.modelNumber}</p> : <Skeleton className="h-4 w-24" />}
					</div>
					<div className="flex items-center">
						{pricingAndStockData?.anchorArticle?.ratings ? 
						<div>
							<Rating
								className="relative bottom-1 mr-2"
								initialValue={pricingAndStockData.anchorArticle.ratings}
								readonly
								size={20}
								SVGstyle={{ display: 'inline-block' }}
								/>
							{pricingAndStockData.anchorArticle.ratings.toFixed(1)} Stars
						</ div> : <Skeleton className="h-2 w-12" />
						}
					</div>
					{anchorArticle ? 
						<Image
							alt={anchorArticle.images[0].altText}
							className="mt-4"
							src={anchorArticle.images[0].url}
							height={300}
							width={300}
						/> 
						:
						<Skeleton className="w-72 h-72" />
					}
					
				</div>
				<div className="flex flex-col gap-4 mt-6">
					{productData ? 
					<p className="text-2xl font-bold">
					{productData.optimizedPrice.displayPrice.formattedValue}
					<span className="text-xs"> / each</span>
					</p>
					: <Skeleton className="h-10 w-32" />	
				}
					{productData ? <p>
					{productData.storeStock.stockLevel} in stock at{" "}
					{productData.aisleBay.storeDisplayName} | Aisle{" "}
					{productData.aisleBay.aisleLocation}, Bay{" "}
					{productData.aisleBay.bayLocation}
					</p> : <Skeleton className="h-4 w-72" /> }
					<div className="flex max-lg:flex-col md:grid-cols-2 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Delivery</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<p>Get it shipped to your house.</p>
								<hr />
								<p>
									{productData?.inventory.onlineStock.stockLevel} {productData?.inventory.onlineStock.stockLevelStatus} online
								</p>
								<p>
									{productData?.fulfillmentMessages.shipToHome.shippingCostType}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
							<CardTitle className="text-lg">In-Store Pickup</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<p>Pick up today at your local store.</p>
								<hr />
								<p>

									{productData?.fulfillmentMessages.findInStore.storeStockLevel} in stock at {productData?.aisleBay.storeDisplayName}
								</p>
							</CardContent>
						</Card>
					</div>
					<p className="text-xs">
					Dates and fees are estimates. See exact dates and fees during
					checkout.
					</p>
				<Button>Add to Cart</Button>
				</div>
			</div>
			<div className="flex gap-2 mt-12">
				{pricingAndStockData?.supportingArticles.map(article =>
					<Card key={article.code} className="w-72 hover:cursor-pointer" onClick={() => router.push(`/article/${article.code}`)}>
						<CardHeader>
							<CardTitle>{article.name}</CardTitle>
						</CardHeader>
						<CardContent className="flex">
							<Image src={article.images[0].url} alt={article.images[0].altText} width={100} height={100} />
							<div>
								<p>{article.modelNumber}</p>
								<p>{article.code}</p>
								<p>{article.manufacturer}</p>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}


const productdataexmaple = {
	"productId": "1001099459",
	"storeId": "7047",
	"unitOfMeasureCode": "EA",
	"optimizedPrice": {
		"productId": "1001099459",
		"storeId": "7047",
		"unitOfMeasureCode": "EA",
		"displayPrice": {
			"currencyIso": "CAD",
			"value": 59.98,
			"formattedValue": "$59.98",
			"unitOfMeasureCode": "EA",
			"unitOfMeasure": "each"
		},
		"lpc": false,
		"productStatus": "LA"
	},
	"storeStock": {
		"stockLevelStatus": "inStock",
		"stockLevel": 12
	},
	"onlineStock": {
		"stockLevelStatus": "inStock",
		"stockLevel": 25
	},
	"aisleBay": {
		"productCode": "1001099459",
		"storeId": "7047",
		"storeDisplayName": "BURNABY",
		"bayLocation": "001",
		"aisleLocation": "15"
	},
	"badges": [],
	"tags": [],
	"showZwas": false,
	"bopis": true,
	"boss": true,
	"buyable": true,
	"buyNow": true,
	"id": "1001099459-7047",
	"isFromSap": false,
	"shipToHome": true,
	"isBopisOutOfAreaEnabled": true,
	"promotionMessages": {},
	"bodfs": true,
	"isOnlineLocalized": false,
	"isOnlineLocalizedToGivenStore": false,
	"fulfillmentMessages": {
		"addToCart": "enabled",
		"findInStore": {
			"displayStatus": "inStockAt",
			"storeStockLevel": 12
		},
		"shipToHome": {
			"availableForATC": true,
			"displayStatus": "inStock",
			"shippingCostType": "freeShipping",
			"curbsideDelivery": false
		},
		"bopis": {
			"availableForATC": true,
			"displayStatus": "pickUpToday"
		},
		"boss": {
			"availableForATC": false,
			"displayStatus": "hidden"
		},
		"express": {
			"availableForATC": true,
			"displayStatus": "scheduledDelivery"
		}
	},
	"inventory": {
		"storeStock": {
			"stockLevel": 12,
			"stockLevelStatus": "inStock",
			"soc": "3"
		},
		"onlineStock": {
			"stockLevel": 25,
			"stockLevelStatus": "inStock",
			"soc": "3"
		}
	},
}

const exmapleprincingandstockdata = {
	"anchorArticle": {
	"manufacturer": "Milwaukee Tool",
	"code": "1001099459",
	"name": "22 oz. Milled Face Framing Hammer",
	"url": "/product/milwaukee-tool-22-oz-milled-face-framing-hammer/1001099459",
	"modelNumber": "48-22-9022",
	"images": [
		{
		"imageType": "PRIMARY",
		"format": "desktop",
		"url": "https://images.homedepot.ca/productimages/p_1001099459.jpg",
		"altText": "22 oz. Milled Face Framing Hammer",
		"code": "p_1001099459"
		}
	],
	"optimizedPrice": {
		"productId": "1001099459",
		"storeId": "7047",
		"displayPrice": {
		"currencyIso": "CAD",
		"value": 59.98,
		"formattedValue": "$59.98",
		"unitOfMeasure": "each",
		"unitOfMeasureCode": "EA"
		},
		"productStatus": "LA",
		"lpc": false
	},
	"ratings": 4.7324,
	"reviews": 370,
	"articleType": "Z001",
	"admsLiteEligible": false
	},
	"supportingArticles": [
	{
		"manufacturer": "Milwaukee Tool",
		"code": "1001581870",
		"name": "12 -inch Nail Puller with Dimpler",
		"url": "/product/milwaukee-tool-12-inch-nail-puller-with-dimpler/1001581870",
		"modelNumber": "48-22-9032",
		"images": [
		{
			"imageType": "PRIMARY",
			"format": "desktop",
			"url": "https://images.homedepot.ca/productimages/p_1001581870.jpg",
			"altText": "12 -inch Nail Puller with Dimpler",
			"code": "48-22-9032_1.jpg"
		}
		],
		"optimizedPrice": {
		"productId": "1001581870",
		"storeId": "7047",
		"displayPrice": {
			"currencyIso": "CAD",
			"value": 34.98,
			"formattedValue": "$34.98",
			"unitOfMeasure": "each",
			"unitOfMeasureCode": "EA"
		},
		"productStatus": "LA",
		"lpc": false
		},
		"ratings": 4.6289,
		"reviews": 97,
		"articleType": "Z001",
		"admsLiteEligible": false
	}
	]
}