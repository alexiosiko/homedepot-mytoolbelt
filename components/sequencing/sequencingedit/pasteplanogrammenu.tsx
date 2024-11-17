import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '../../ui/textarea';
import { ArticleType } from '../hooks/useSequencing';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';


export default function PastePlanogramMenu({ articles, setArticles }: { 
	articles: ArticleType[],
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>
}) {
	const [dialogIsActive, setDialogIsActive] = useState<boolean>(false);
	// const [input, setInput] = useState<string>(exmaple);
	const [input, setInput] = useState<string>("");
	const handlePaste = () => {
		try {
			const articles = tryFormatPlanogram();
			setArticles([...articles]); // Re-render
			toast({
				duration: 2500,
				title: `Successfully pasted articles.`,
			});
			setDialogIsActive(false);
		} catch (e: unknown) {
			const error = e as Error;
			toast({
				duration: 2500,
				title: error.message,
				description: "Please try copying the data from planogram correctly.",
				variant: "destructive",
			});
		}

	}	
	const tryFormatPlanogram = (): ArticleType[] => {
		const values = input.split(" ") // Split input by gaps
		values.forEach(value => {
			value = removeAllNaNs(value);


			if (value.length == 6) // 1670445 -> 1001670445
				value = "1000" + value;
			else if (value.length == 7) // 650203 -> 1000650203
				value = "100" + value;
			else if (value.length != 10) // Not valud
				return;

			const article: ArticleType = {
				objectid: uuidv4(),
				num: value,
				qty: "1",
				label: "Regular BC",
				flag: "None",
			};

			articles.push(article);
		});
		return articles;
	}
  return (
	<Dialog open={dialogIsActive}>
		<DialogTrigger asChild>
			<Button variant="outline" onClick={() => setDialogIsActive(true)}>Paste Planogram</Button>
		</DialogTrigger>
		<DialogContent className='h-full max-h-96 flex flex-col'>
			<DialogHeader>
				<DialogTitle>Paste Planogram Data</DialogTitle>
				<DialogDescription >
						Click and drag and highlight all the articles on the planogram, then copy and paste into the box below.
						The articles will automatically be formatted and sequenced into the bay.
					
					</DialogDescription>
			</DialogHeader>
			<Textarea value={input} onChange={(e) => setInput(e.target.value)} className='h-full' />
			<DialogFooter className='gap-y-2'>
				<Button variant="destructive" onClick={() => setDialogIsActive(false)}>Cancel</Button>
				<Button onClick={handlePaste}>Paste</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
  )
}


const removeAllNaNs = (s: string): string => {
	let newS = "";
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (isNaN(Number(c)))
			continue;
		newS += c;
	}
	return newS;
}