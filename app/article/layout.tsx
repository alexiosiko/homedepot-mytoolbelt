import Search from "@/components/article/search";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Search />
			{children}
		</>
	);
}
