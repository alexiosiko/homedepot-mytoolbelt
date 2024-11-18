"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {  ScrapedData } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import axiosRetry from 'axios-retry';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rating } from 'react-simple-star-rating'
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Search from "@/components/article/search";



export default function Page({
		params,
	}: {
	params: Promise<{ articleNumber: string }>
}) {
	const router = useRouter();
	const [scrapedData, setScrapedData] = useState<ScrapedData | undefined>(undefined);
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


	useEffect(() => {
		const fetchData = async () => {
			try {
				const articleNumber = (await params).articleNumber;
				const url = `https://www.homedepot.ca/product/${articleNumber}`;
				const res = await axios.get("/api/scrape", {
					params: { url }
				})
				console.log(res.data);
				setScrapedData(res.data);
			} catch (e: any) {
				toast({ 
					title: "Error scraping data",
					description: e.message,
					variant: "destructive"
				})
			}
		};
		fetchData();
	}, []);

	const handleDummyButton = () => {
		toast({
			title: "This button does not do anything :("
		});
	}
	
	return (
		<div>
			<Search />
			
			<div className="flex max-w-3xl  mx-auto max-md:flex-col max-md:items-center mt-4 justify-center gap-4">
				<div className="flex flex-col gap-2 md:w-[40%]">
					{scrapedData ? <p className="text-lg font-semibold">{scrapedData.productName}</p> : <Skeleton className="h-10 w-24" /> }
					<div className="flex gap-2">
						{scrapedData ? <p className="text-xs">{scrapedData.skuLine}</p> : <Skeleton className="h-4 w-32" />}
						{scrapedData ? <p className="text-xs">{scrapedData.modelLine}</p> : <Skeleton className="h-4 w-24" />}
					</div>
					<div className="flex items-cente ">
						{scrapedData?.ratingNumber ? 
						<p>
							{scrapedData.ratingNumber.replace(/\D/g, '')} Ratings
						</ p> : <Skeleton className="h-2 w-12" />
						}
					</div>
					{scrapedData?.skuLine ? 
						<Image
							alt="product.png"
							className="mt-4 w-full"
							src={`https://images.homedepot.ca/productimages/p_${scrapedData.skuLine.replace(/\D/g, '')}.jpg?product-images=m`}
							height={500}
							width={500}
						/> 
						:
						<Skeleton className="w-72 h-72" />
					}
					
				</div>
				<div className="flex flex-col gap-4 mt-6 md:w-[60%]">
					<div className="flex gap-2 items-center">

						{scrapedData?.price ? 
						<p className="text-2xl font-bold">
						{scrapedData.price}
						</p>
						: <Skeleton className="h-8 w-32" />	
					}
					<span className="text-xs"> / each</span>
				</div>
					{scrapedData?.stock ? <p>
					{scrapedData.stock} in stock
					</p> : <Skeleton className="h-4 w-72" /> }
					{scrapedData?.description ? <p>{scrapedData.description}asddsa</p> : <Skeleton className="h-48 w-24" />}
					<div className="lg: grid-cols-2 max-lg:flex-col gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Delivery</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								{scrapedData ?
								<>
									<p>Get it shipped to your house.</p>
									<Separator />
									<p>
										<Button variant="outline"  onClick={handleDummyButton}>Click Here</Button> to Calculate Shipping
									</p>
									</> : <Skeleton className="h-24 w-38" />
								}
							</CardContent>
						</Card>
						{/* <Card>
							<CardHeader>
								<CardTitle className="text-lg">In-Store Pickup</CardTitle>
							</CardHeader>
							<CardContent>
								<p><Button variant="outline" onClick={handleDummyButton}>Click Here</Button> to Check Store Stocks</p>
							</CardContent>
							
						</Card> */}
					</div>
					<p className="text-xs">
					Dates and fees are estimates. See exact dates and fees during
					checkout.
					</p>
				{scrapedData ? <Button onClick={handleDummyButton}>Add to Cart</Button> : <Skeleton className="w-full h-8" />}
				</div>
			</div>
			<div className="flex gap-2 mt-12 justify-center">
				{/* {scrapedData??.map(article =>
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
				)} */}
			</div>
		</div>
	);
}


