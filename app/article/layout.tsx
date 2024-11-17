import Search from "@/components/article/search";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="text-center flex justify-center items-center h-screen">
			<div>
				<Search />
				{children}
			</div>
		</div>
	);
}
