import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/nav/appsidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const font = Space_Grotesk({
	subsets: ['latin'],
	weight: "500"
})

export const metadata: Metadata = {
  title: "My Day",
  description: "A simple myday clone created by Alexi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
			className={`${font.className} antialiased`}
			>
			<SidebarProvider>
				<TooltipProvider>
				<SidebarTrigger />
				<AppSidebar />

					<main className="w-full p-2">

						{children}
					</main>
				</TooltipProvider>
			</SidebarProvider>
			<Toaster />
			</body>
		</html>
  );
}
