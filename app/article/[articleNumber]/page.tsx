"use client"
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Page({
		params,
	}: {
	params: Promise<{ articleNumber: string }>
}) {
	const fetchData = async () => {
		console.log("fetching");
		try {
			const articleNum = (await params).articleNumber;
			const res = await axios.get(`https://www.homedepot.ca/api/productsvc/v1/products/${articleNum}/store/7047`)
			console.log(res.data);
		} catch (e: any) {
			console.error("error");
		} finally {
			console.log("done fetching");
		}
	}
	fetchData();


	return (
		<div>
			<Image alt="article-image" src="https://images.homedepot.ca/productimages/p_1001053348.jpg" height={400} width={400} />
		</div>
	);
}
