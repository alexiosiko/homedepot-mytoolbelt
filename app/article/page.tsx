"use client"

import Search from "@/components/article/search"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function Page() {
	const router = useRouter();
  return (
		<div className="h-screen flex justify-center items-center max-w-xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle className="mb-4 text-center">Search a product by it's article number</CardTitle>
					<Search />
				</CardHeader>
				<CardContent>
					<CardDescription>Note: Due to Puppeteer (scraping note package) requiring chrome binaries, this will NOT work in production and only work when hosted locally.</CardDescription>
					<CardDescription className=' mt-4'>This data is retrieved using 
						Puppeteer and scraping the data dynamically by using
						their asynchronous functions that wait for elements to
						load based on classnames.  </CardDescription>
					<CardDescription className="mt-4">Please note that the GET requests occasionally fail due to Home Depot's API security measures or spam prevention rules.</CardDescription>		
					<Separator />
					<CardDescription>Some example articles:</CardDescription>
					<ul className="flex gap-2 mt-2"> 
						<Button variant="secondary" onClick={() => router.push(`/article/1000686028`)}>1000686028</Button>
						<Button variant="secondary" onClick={() => router.push(`/article/1001626034`)}>1001626034</Button>
						<Button variant="secondary" onClick={() => router.push(`/article/1001629974`)}>1001629974</Button>
						<Button variant="secondary" onClick={() => router.push(`/article/1000413911`)}>1000413911</Button>
					</ul>
				</CardContent>
			</Card>
		</div>
  )
}
