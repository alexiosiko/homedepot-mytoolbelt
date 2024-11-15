import { useState } from 'react'


export type ArticleType = {
	objectid: string,
    num: string;
    qty: string;
    label: string;
	flag: string;
}
export default function useSequencing() {
	const [bayId, setBayId] = useState<string>("");
	const [articles, setArticles] = useState<ArticleType[]>([]);
	const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());

	const handleSelectAll = (selectAll: boolean) => {
		const newSet = new Set<number>();
		if (selectAll)
			for (let i = 0; i < articles.length; i++)
				newSet.add(i);
		
		setSelectedIndexes(newSet);
	}
	const handleCheckboxChange = (index: number) => {
		setSelectedIndexes((prevSelected) => {
			const newSelected = new Set(prevSelected); // Make new set or else won't re-render :(
			if (newSelected.has(index))
			  	newSelected.delete(index);
			else
				newSelected.add(index);
			return newSelected;
		  });
	}

	return { articles, setArticles, setBayId, bayId, selectedIndexes, handleSelectAll, handleCheckboxChange, setSelectedIndexes };
}
