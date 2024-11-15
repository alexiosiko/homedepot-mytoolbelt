"use client" 

import useSequencing, { ArticleType } from "@/components/sequencing/hooks/useSequencing";
import { Sequencing } from "@/components/sequencing/sequencing";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect } from "react";

export default function Page({ params }: {
	params: Promise<{ bayId: string }>
}) {
	const { articles, setSelectedIndexes, setArticles, handleSelectAll, selectedIndexes, setBayId, handleCheckboxChange, bayId } = useSequencing();
	useEffect(() => {
		const getBay = async () => {
			try {

				const bayId = (await params).bayId;
				setBayId(bayId);
				const res = await axios.get(`/api/sequencing/bay`, {
					params: { bayId }
				});
				if (res.status == 201) {
					toast({
						title: "Created bay.",
						description: "Bay did not exist, so one was created."
					});
					return;
				} else if (res.status != 200)
					throw Error("Server error");
		
				const fetchedArticles: ArticleType[] = Array.isArray(res.data.articles)
					? res.data.articles
					: [];
				console.log(res.data.articles);
				setArticles(fetchedArticles);
			} catch (e: any) {
				toast({
					title: "Error connecting to server.",
					variant: "destructive",
				})
				console.error(e);
			}
		}
		getBay();
	}, []);
	return (
		<div>
			<Sequencing
				setBayId={setBayId}
				bayId={bayId}
				articles={articles}
				setArticles={setArticles}
				setSelectedIndexes={setSelectedIndexes}
				handleSelectAll={handleSelectAll}
				handleCheckboxChange={handleCheckboxChange}
				selectedIndexes={selectedIndexes}/>
		</div>
	)
}
