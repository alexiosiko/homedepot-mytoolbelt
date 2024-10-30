import { useState } from 'react'


export type ArticleType = {
    num: string;
    qty: string;
    label: string;
	flag: string;
}
export default function useSequencing() {
	const [articles, setArticles] = useState<ArticleType[]>(exampleArticles);
	const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
	const handleEdit = () => {

	}
	const handleSelectAll = (selectAll: boolean) => {
		const newSet = new Set<number>();
		if (selectAll) {
			for (let i = 0; i < articles.length; i++)
				newSet.add(i);
		}
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

	return { articles, setArticles, selectedIndexes, handleSelectAll, handleCheckboxChange, setSelectedIndexes, handleEdit };
}


const exampleArticles = [
	{
		"num": "1000112351",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	},
	{
		"num": "1000166432",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	},
	{
		"num": "1000112341",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	},
	{
		"num": "1000133356",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	},
	{
		"num": "1001231236",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	},
	{
		"num": "1000123336",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
	}
]