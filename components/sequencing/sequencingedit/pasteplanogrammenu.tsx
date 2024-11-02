import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '../../ui/textarea';
import { ArticleType } from '../hooks/useSequencing';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';


export default function PastePlanogramMenu({ articles, setArticles }: { 
	articles: ArticleType[],
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>
}) {
	const [dialogIsActive, setDialogIsActive] = useState<boolean>(false);
	// const [input, setInput] = useState<string>(exmaple);
	const [input, setInput] = useState<string>("");
	const handlePaste = () => {
		try {
			const count = tryFormatPlanogram();
			toast({
				duration: 2500,
				title: `Successfully pasted ${count} articles.`,
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
	const tryFormatPlanogram = (): number => {
		let count = 0;
		const values = input.split(" ") // Split input by gaps
		values.forEach(value => {
			value = removeAllNaNs(value);


			if (value.length == 6) // 1670445 -> 1001670445
				value = "1000" + value;
			else if (value.length == 7) // 650203 -> 1000650203
				value = "100" + value;
			else if (value.length != 10) // Not valud
				return;

			count++;

			const article: ArticleType = {
				num: value,
				qty: "1",
				label: "Regular BC",
				flag: "None",
			};

			articles.push(article);
		});
		setArticles([...articles]); // Re-render component
		return count;
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
						Paste planogram from top left of article list (id 1) to bottom right of last h-facing.
					
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