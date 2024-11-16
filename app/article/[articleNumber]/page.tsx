"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { PricingAndDataType, ProductData } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";



export default function Page({
		params,
	}: {
	params: Promise<{ articleNumber: string }>
}) {
	const [productData, setProductDAta] = useState<ProductData | null>(null); //productdataexmaple)
	const [pricingAndStockData, setPricingAndStockData] = useState<PricingAndDataType | null>(null); // ;exmapleprincingandstockdata);
	const fetchProductData = async () => {
		try {
			// Use a proxy to fetch article data from homedepot servers to avoid CORS error
			const articleNum = (await params).articleNumber;
			// const url = `https://www.homedepot.ca/product${articleNum}`;
			const url = `https://www.homedepot.ca/api/productsvc/v1/products/${articleNum}/store/7047`;
			const res = await axios.get(`/api/proxy`, {
				params: { url }
			})
			console.log(res.data);
			setProductDAta(res.data);
		} catch (e: any) {
			console.error("error");
			toast({
				title: "Error fetching product data ...",
				description: e.message,
				variant: 'destructive',
			});
		}
	}

	const fetchPricingAndStockData = async () => {
		try {
			// Use a proxy to fetch article data from homedepot servers to avoid CORS error
			const articleNum = (await params).articleNumber;
			const url = `https://www.homedepot.ca/api/fbtsvc/v1/fbt/products/${articleNum}/store/7047?checkStockAndPrice=true&lang=en`;
			const res = await axios.get(`/api/proxy`, {
				params: { url }
			})
			console.log(res.data);
			setPricingAndStockData(res.data);
		} catch (e: any) {
			console.error("error");
			toast({
				title: "Error fetching pricing and stock data ...",
				description: e.message,
				variant: 'destructive',
			});
		} finally {
		}
	}
	const test = async () => {
		try {
			// Use a proxy to fetch article data from homedepot servers to avoid CORS error
			const articleNum = (await params).articleNumber;
			const url = `https://www.homedepot.ca/product/${articleNum}`;
			const res = await axios.get(`/api/scrape`, {
				params: { url }
			})
			console.log(res.data);
		} catch (e: any) {
			console.error("error");
			toast({
				title: "Error fetching pricing and stock data ...",
				description: e.message,
				variant: 'destructive',
			});
		} 
	}
	useEffect(() => {
		fetchProductData();
		fetchPricingAndStockData();
		// test();
	}, [])


	return (
		<>
				<div className="flex max-sm:flex-col gap-4 justify-center">
					<div className="flex flex-col gap-1">
						{pricingAndStockData ? <p className="text-lg">{pricingAndStockData?.anchorArticle.name}</p> : <Skeleton className="w-48 h-4"  /> }
						{productData ? <p className="text-xs">{productData?.productId}</p> : <Skeleton className="w-24 h-2"  />}
						{pricingAndStockData?.anchorArticle.images[0].url ?
							<Image
							alt="article-image"
							src={pricingAndStockData?.anchorArticle.images[0].url}
							height={300}
							width={300}
							/>
							: <Skeleton className="h-72 w-24"/>
						}
					</div>
					<div className="flex flex-col gap-4">
						{productData ? 
							<>
								<p className="text-2xl">{productData?.optimizedPrice.displayPrice.formattedValue}<span className="text-xs">/each</span></p>
								<p>{productData?.storeStock.stockLevel} in stock at {productData?.aisleBay.storeDisplayName} | Aisle {productData?.aisleBay.aisleLocation}, Bay {productData?.aisleBay.bayLocation}</p> 
							</> 
							:
							<Skeleton className="h-4 w-24" />
						}
						<div className="flex gap-12">
							{productData ? <Card>
								<CardHeader>
									<p className="text-lg">Delivery</p>
								</CardHeader>
								<CardContent>
									<p>{productData?.onlineStock.stockLevel} {productData?.onlineStock.stockLevelStatus}</p>
									<p>Shipping cost: {productData?.fulfillmentMessages.shipToHome.shippingCostType}</p>
								</CardContent>
							</Card> : <Skeleton className="w-48 h-48" />}
							{productData ? <Card>
								<CardHeader>
									<p className="text-lg">In Store Pickup</p>
								</CardHeader>
								<CardContent>

								</CardContent>
							</Card> : <Skeleton className="w-48 h-48" />}
						</div>
					</div>
				</div>
    
		</>
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