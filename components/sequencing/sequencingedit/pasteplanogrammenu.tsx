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
			tryFormatPlanogram();
			toast({
				duration: 2500,
				title: "Successfully pasted planogram data.",
				
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
	const tryFormatPlanogram = () => {
		const linesArray = input.split("\n") // Split input by new lines
		linesArray.forEach(line => {
			/*
				Example input:
					1 1001592723 Display 1

				Example output:
					values[0] = 1 // ID
					values[1] = 1001592723 // Num
					values[2] = Display // Style
					values[3] = 1 // H facings
			*/
			const values = line.split(' '); // Split with each space 
			// Skip because the line is invalid
			if (values.length != 4)
				return;

			// Format article nums
			values[1] = removeAllNaNs(values[1]);
			if (values[1].length == 7)
				values[1] = '100' + values[1];
			else if (values[1].length == 6)
				values[1] = '1000' + values[1];

			const article: ArticleType = {
				num: values[1],
				qty: values[3],
				label: "Regular BC",
				flag: "None",
			};

			articles.push(article);
		});
		setArticles([...articles]); // Re-render component
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
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="link">Hover to See How</Button>
						</TooltipTrigger>
						<TooltipContent className='shadow-xl'>
							1 1001592723 Display 1<br />
							2 1001814681 Display 1<br />
							3 1793785Recip Display 1<br />
							4 1793785ImpW... Display 1<br />
							5 756113Recip Display 1<br />
							6 1001725882 Display 1<br />
							7 1725882Impact Display 1<br />
							<Image className='p-4' width={250} height={200} alt='reference-image.png' src="/images/pasteplanogramreference.png" />
						</TooltipContent>
						

					</Tooltip>
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