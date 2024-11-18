"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Highlight from "@/components/ui/highlight";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";


export default function Home() {
	const router = useRouter();
	const openInNewWindow = (url: string) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	  };
	return (
		<div className="flex justify-center mx-auto ">
			<Card className="w-full max-w-2xl p-6 shadow-lg">
				<CardHeader className="md:flex lg:flex-row justify-center gap-4 items-center">
					<div >
						<CardTitle className="text-4xl mb-4 flex gap-2 items-baseline" >Hi! I'm Alexi.
							<FaGithub className="hover:cursor-pointer" onClick={() => openInNewWindow("https://github.com/alexiosiko/homedepot-mytoolbelt")} size={24} />
							<CgProfile className="hover:cursor-pointer" onClick={() => openInNewWindow("https://www.alexios.ca/")} size={24} />
						</CardTitle>
						<p>
							I wanted to demonstrate my 
							<Highlight> passion
							</Highlight>  for software
							development and my dedication to <Highlight>
							Orange Academy
								</Highlight>,
							so I created this small project as part of my
							journey for this program.
						</p>
					</div>
					<iframe loading="eager" className="relative left-8 scale-150 bottom-12 object-contain" src="https://lottie.host/embed/f07f6783-d7a5-4e6e-8c85-60f1920a867c/ecpvQACrMa.json"></iframe>
				</CardHeader>
				<CardContent>
					<CardDescription>
						I also saw an <Highlight>opportunity</Highlight> with the sequencing app. Rather than having to enter each article one by one,
						I came up with a simple solution to copy and paste the planogram into the sequencing application, 
						making sequencing much more <Highlight>efficient</Highlight>.
						</CardDescription>
					<Separator className="my-4" />
					<h2 className="text-2xl mb-2">Technologies and Skills Utilized</h2>
					<ul className="list-disc list-inside space-y-2">
					<li>
						<Badge className="mr-2">Next.js 15</Badge>
						Used Next.js for dynamic routing, API integration, and server-side rendering.
					</li>
					<li>
						<Badge className="mr-2">Shadcn UI</Badge>
						Used this highly customizable UI library for a clean and modern interface.
					</li>
					<li>
						<Badge className="mr-2">MongoDB</Badge>
						Implemented MongoDB as the database to manage and store sequencing data.
					</li>
					<li>
						<Badge className="mr-2">Web Scraping</Badge>
						Utilized Puppeteer to scrape data from the Home Depot website for the Article Lookup functionality.
					</li>
					<li>
						<Badge className="mr-2">Framer-Motion</Badge>
						For simple animations in the sequencing app.
					</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}	