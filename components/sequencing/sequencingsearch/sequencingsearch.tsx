import React, { useState } from 'react'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../../ui/table'
import { Input } from '../../ui/input'
import { ArticleType } from '../hooks/useSequencing'
import SequencingDelete from '../sequencingdelete'
import EditArticles from '../editarticles'

export default function SequencingSearch({ articles, handleSelectAll, selectedIndexes, setArticles, handleCheckboxChange, setSelectedIndexes }: {
	articles: ArticleType[],
	setSelectedIndexes: React.Dispatch<React.SetStateAction<Set<number>>>,
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>,
	handleSelectAll: (selectAll: boolean) => void,
	handleCheckboxChange: (index: number) => void,
	selectedIndexes: Set<number>,
}) {
	const [input, setInput] = useState<string>('');
	const handleHandleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		
		// Allow only numeric input, I found this piece of code ONLINE
		if (/^\d*$/.test(value)) {
			setInput(value);
		}
	};
	
	return (
		<div className='w-full'>
			<div className='flex justify-between sticky top-0 py-4 z-10 bg-background'>
				<Input 
					value={input} 
					onChange={handleHandleUpdateInput}
					placeholder="Enter article number"
					/>
				<div className='flex gap-2'>
					<EditArticles data={articles} selectedIndexes={selectedIndexes} setData={setArticles} setSelectedIndexes={setSelectedIndexes} />
					<SequencingDelete selectedIndexes={selectedIndexes} setArticles={setArticles}  setSelectedIndexes={setSelectedIndexes}/>
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow >
						<TableHead><Input type="checkbox" className="w-4" onChange={(e) => handleSelectAll(e.target.checked)} /></TableHead>
						<TableHead>Article #</TableHead>
						<TableHead>Seq</TableHead>
						<TableHead>Qty</TableHead>
						<TableHead>Label</TableHead>
						<TableHead>Flag</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{articles.map((data, index) => {
						// Filter
						if (input != null && !data.num.includes(String(input)))
							return;
						return (
							<TableRow key={index}>
								<TableCell><Input type="checkbox" checked={selectedIndexes.has(index)} onChange={() => handleCheckboxChange(index)} className="w-4" /></TableCell>
								<TableCell>{data.num}</TableCell>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{data.qty}</TableCell>
								<TableCell>{data.label}</TableCell>
								<TableCell>{data.flag}</TableCell>
							</TableRow>
						)
						}
					)}
				</TableBody>
			</Table>
		</div>
	)
}
