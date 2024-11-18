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
import { Separator } from "@/components/ui/separator";
import { examplePricingAndStockData, exmapleProductData } from "@/lib/data";
import Search from "@/components/article/search";



export default function Page({
		params,
	}: {
	params: Promise<{ articleNumber: string }>
}) {
	const router = useRouter();
	const [productData, setProductData] = useState<ProductData | null>(null); // productdataexmaple)
	const [pricingAndStockData, setPricingAndStockData] = useState<PricingAndDataType | null>(null); // ;exmapleprincingandstockdata);
	const [fetchingError, setFetchingError] = useState<boolean>(false);

	// This is the axios retry library that automatically retries an axios 
	// request if failed x amount of times. I needed this because the homedepots
	// product API sometimes blocks my request.
	axiosRetry(axios, {
		retries: 3,
		retryDelay: axiosRetry.exponentialDelay, // Exponential backoff delay between retries
		retryCondition: (error: any) => {
			return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status != 200;
		},
	});

	const fetchProductData = async (articleNumber: string) => {
		const url = `https://www.homedepot.ca/api/productsvc/v1/products/${articleNumber}/store/7047`;
		const res = await axios.get(`/api/proxy`, { params: { url } });
		const productData: ProductData = res.data;
		console.log(productData);
		setProductData(productData);
	}

	const fetchPricingAndStockData = async (articleNumber: string) => {
		const url = `https://www.homedepot.ca/api/fbtsvc/v1/fbt/products/${articleNumber}/store/7047?checkStockAndPrice=true&lang=en`;
		const res = await axios.get(`/api/proxy`, { params: { url } });
		const pricingAndStockData: PricingAndDataType = res.data;
		setPricingAndStockData(pricingAndStockData);
		console.log(pricingAndStockData);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
			const articleNumber = (await params).articleNumber;
			
				
		
			// Fetch both APIs in parallel with retries
			await Promise.all([
				fetchProductData(articleNumber),
				fetchPricingAndStockData(articleNumber)
			]);
			} catch (e: any) {
			setFetchingError(true);
			console.error("Error fetching product data:", e.message);
			toast({
				title: "Error fetching product data",
				description: e.message,
				variant: "destructive"
			});
			}
		};
		fetchData();
	}, []);

	const setLocalData = () => {
		setProductData(exmapleProductData);
		setPricingAndStockData(examplePricingAndStockData);
		setFetchingError(false);
	}
	if (fetchingError)
		return (
			<div className="h-screen flex justify-center items-center">
				<div>
					<h1>Error fetching data</h1>
					<p>2 main reasons for this occurance:</p>
					<ul className="list-disc">
						<li className="ml-4">Home Depot API has blocked our GET requests from their api</li>
						<li className="ml-4">Article number does not exist</li>
					</ul>
					<p>
						<Button onClick={setLocalData}>Click Here</Button> to use local data 
					</p>
				</div>
			</div>
		)
	
	const anchorArticle = pricingAndStockData?.anchorArticle;

	return (
		<div>
			<Search />
			<div className="md:flex max-sm:flex-col mt-4 justify-center gap-4">
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
								{productData ?
								<>
									<p>Get it shipped to your house.</p>
									<Separator />
									<p>
										{productData?.inventory.onlineStock.stockLevel} {productData?.inventory.onlineStock.stockLevelStatus} online
									</p>
									<p>
										{productData?.fulfillmentMessages.shipToHome.shippingCostType}
									</p>
									</> : <Skeleton className="h-24 w-60" />
								}
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">In-Store Pickup</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								{productData ?
									<>
									<p>Pick up today at your local store.</p>
									<Separator />
									<p>

										{productData?.fulfillmentMessages.findInStore.storeStockLevel} in stock at {productData?.aisleBay.storeDisplayName}
									</p>
									</>	: <Skeleton className="h-24 w-60" />
								}
							</CardContent>
						</Card>
					</div>
					<p className="text-xs">
					Dates and fees are estimates. See exact dates and fees during
					checkout.
					</p>
				{productData ? <Button>Add to Cart</Button> : <Skeleton className="w-full h-8" />}
				</div>
			</div>
			<div className="flex gap-2 mt-12 justify-center">
				{pricingAndStockData?.supportingArticles?.map(article =>
					<Card key={article.code} className="w-72 hover:cursor-pointer" onClick={() => router.push(`/article/${article.code}`)}>
						<CardHeader>
							<CardTitle>{article.name}</CardTitle>
						</CardHeader>
						<CardContent className="flex">
							<Image src={article.images[0].url} alt={article.images[0].altText} width={100} height={100} />
							<div >
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


