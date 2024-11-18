import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/appsidebar";

const font = Space_Grotesk({
subsets: ['latin'],
weight: "500"
});

export const metadata: Metadata = {
title: "MyToolBelt",
description: "A simple sequencing and article look  clone created by Alexi",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
	<html lang="en">
	<body className={`${font.className} antialiased`}>
		<SidebarProvider>
			<AppSidebar />
			<div className="flex-1 flex flex-col">
			<header className="p-2">
				<SidebarTrigger />
			</header>
			<main className="p-2 w-full">
				{children}
			</main>
			</div>
		<Toaster />
		</SidebarProvider>
	</body>
	</html>
);
}
