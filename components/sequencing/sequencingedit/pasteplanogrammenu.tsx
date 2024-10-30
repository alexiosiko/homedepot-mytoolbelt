import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '../../ui/textarea';
import { ArticleType } from '../hooks/useSequencing';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
		} catch (e: any) {
			console.error(e);
			toast({
				duration: 2500,
				title: e.message,
				description: "Please try copying the data from planogram correctly.",
				variant: "destructive",
			})
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
			let values = line.split(' '); // Split with each space 
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


const exmaple = "1 1001592723 Display 1\n2 1001814681 Display 1\n3 1793785Recip Display 1\n4 1793785ImpW... Display 1\n5 756113Recip Display 1\n6 1001725882 Display 1\n7 1725882Impact Display 1\n8 1001129757 Display 1\n9 1793785CircS... Display 1\n10 1793785Grinder Display 1\n11 756113CircSaw Display 1\n12 756113Grinder Display 1\n13 1001797887 Display 1\n14 1797887Impact Display 1\n15 1001633086 Display 1\n16 1001793785 Display 1\n17 1793785Impact Display 1\n18 1793785Flash... Display 1\n19 756113Impact Display 1\n20 1000756113 Display 1\n21 756113Flashli... Display 1\n22 1000755643 Display 1\n23 755643Impact... Display 1\n24 1001633086 Unit 1\n25 1001726414 Unit 1\n26 1001726415 Unit 1\n27 1001043525 Unit 1\n28 1001274331 Unit 1\n29 1001797886 Unit 1\n30 1000736181 Unit 1\n31 1000736182 Unit 1\n32 1001797887 Unit 1\n33 1000535182 Unit 1\n34 1001592723 Unit 1\n35 1001793785 Unit 1\n36 1001782651 Unit 1\n37 1000756113 Unit 2\n38 1001842738 Unit 1\n39 1001819252 Unit 1\n40 1001129757 Unit 1\n41 1001814681 Unit 1\n42 1001842739 Unit 1\n43 1001725882 Unit 1\n44 1000755643 Unit 1\n45 1001034137 Unit 1\n46 1000834425 Unit 1\n47 1001527747 Unit 1\n"

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