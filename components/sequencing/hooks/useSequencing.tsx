import { useState } from 'react'


export type ArticleType = {
	objectid: string,
    num: string;
    qty: string;
    label: string;
	flag: string;
	deleted: boolean; // This is to handle motiondiv exit animations
}
export default function useSequencing() {
	const [articles, setArticles] = useState<ArticleType[]>(exampleArticles);
	const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());

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

	return { articles, setArticles, selectedIndexes, handleSelectAll, handleCheckboxChange, setSelectedIndexes };
}


const exampleArticles = [
	{
		"objectid": "asdb6sadkcds2135",
		"num": "1000112351",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	},
	{
		"objectid": "234976fc97r97nvtrv",
		"num": "1000166432",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	},
	{
		"objectid": "asdca74123e4",
		"num": "1000112341",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	},
	{
		"objectid": "32v0r8nn9wyfsd",
		"num": "1000133356",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	},
	{
		"objectid": "4v57i9 biua",
		"num": "1001231236",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	},
	{
		"objectid": "vc890vn8209f",
		"num": "1000123336",
		"qty": "1",
		"label": "Regular BC",
		"flag": "None",
		"deleted": false,
	}
]