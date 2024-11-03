import React, { useState } from 'react'
import { ArticleType } from '../hooks/useSequencing'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export default function SequenceInput({ setArticles, selectedIndexes }: {
	selectedIndexes: Set<number>,
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>,
}) {
	const [input, setInput] = useState<string>("");
	const { toast } = useToast();
	const handleHandleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		
		// Allow only numeric input, I found this piece of code ONLINE
		if (/^\d*$/.test(value))
			setInput(value);

	};

	const handleInsert = () => {
		if (selectedIndexes.size > 1) {
			toast({ 
				duration: 2500,
				title: "Cannot have multiple articles selected when inserting an article.",
				variant: "destructive",
			})
			return;
		}
		// Get first value IF EXISTS.
		// This is to insert an article at a given index
		let index = null;
		if (selectedIndexes.size == 1)
			index = Array.from(selectedIndexes)[0];

		console.log(selectedIndexes);
		

		if (input === null) {
			toast({
				duration: 2500,
				title: "Article input is empty.",
				variant: "destructive",
			})
			return;
		}
		let num = input;

		if (num.length == 6)
			num = "1000" + num; // ex 765045 => 1000765045
		else if (num.length as number == 7)
			num = "100" + num; // ex 1765045 => 1001765045
		else if (num.length != 10) {
			toast({
				duration: 2500,
				title: "Invalid article number.",
				variant: "destructive",
			})
			return;
		}

		const newArticle: ArticleType = {
			objectid: uuidv4(),
			num: num,
			qty: "1",
			label: "Regular BC",
			flag: "None",
		};

		if (index !== null)
			insertArticleAtIndex(newArticle, index);
		else
			insertArticleToEnd(newArticle);

		setInput("");
		toast({
			duration: 2500,
			title: "Successfully added article."
		})
	};
	const insertArticleAtIndex = (article: ArticleType, index: number) => {
		setArticles((prevArticles) => {
			prevArticles.splice(index, 0, article); // Insert article in place
			return [...prevArticles]; // Returning a new array reference triggers re-render
		});
	}
	const insertArticleToEnd = (article: ArticleType) => {
		setArticles((articles) => {
			articles.push(article);
			return [...articles]; // Re-render
		})
	}

	return (
		<div className='flex gap-2  mt-2 mb-2'>
		<Input
			placeholder='Article number'
			className='max-w-64'

			value={input} 
			onKeyDown={(e) => {if (e.key == "Enter") handleInsert()}}
			onChange={handleHandleUpdateInput}
		/>
		<Button onClick={handleInsert}>{">"}</Button>

		{/*  Copied this online to remove the up and down arrow from number input */}
		<style jsx>{`
			.no-arrows::-webkit-outer-spin-button,
			.no-arrows::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
			}

			.no-arrows {
			-moz-appearance: textfield;
			}
		`}
		</style>
		</div>
		
	);
}


