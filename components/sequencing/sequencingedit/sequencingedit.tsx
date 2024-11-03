import React from 'react'
import SequenceInput from './sequenceeditinput'
import SequencingDelete from '../sequencingdelete'
import EditArticles from '../editarticles'
import PastePlanogramMenu from './pasteplanogrammenu'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../../ui/table'
import { Input } from '../../ui/input'
import { ArticleType } from '../hooks/useSequencing'
import { AnimatePresence } from 'framer-motion'

export default function SequencingEdit({ articles, selectedIndexes, setArticles, setSelectedIndexes, handleSelectAll, handleCheckboxChange}: {
	articles: ArticleType[],
	selectedIndexes: Set<number>,
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>,
	setSelectedIndexes: React.Dispatch<React.SetStateAction<Set<number>>>,
	handleSelectAll: (selectAll: boolean) => void,
	handleCheckboxChange: (index: number) => void,
}) {
	return (
		<div>
			<p>Article List (Total {articles.length})</p>
			<SequenceInput selectedIndexes={selectedIndexes} setArticles={setArticles} />
			<div className="flex justify-between sticky top-0 z-10 py-2 bg-background">
				<div className='flex gap-2'>
					<EditArticles setSelectedIndexes={setSelectedIndexes} setData={setArticles} data={articles} selectedIndexes={selectedIndexes} />
					<PastePlanogramMenu setArticles={setArticles} articles={articles}  />
				</div>
				<SequencingDelete setArticles={setArticles} selectedIndexes={selectedIndexes} setSelectedIndexes={setSelectedIndexes} />
			</div>
			<Table>
				<TableHeader>
					<TableRow  >
						<TableHead><Input type="checkbox" className="w-4" onChange={(e) => handleSelectAll(e.target.checked)} /></TableHead>
						<TableHead>Article #</TableHead>
						<TableHead>Seq</TableHead>
						<TableHead>Qty</TableHead>
						<TableHead>Label</TableHead>
						<TableHead>Flag</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{articles.map((data, index) => 
					<TableRow key={data.objectid} onClick={() => handleCheckboxChange(index)}>
						<TableCell><Input type="checkbox" checked={selectedIndexes.has(index)} onChange={() => {}}  className="w-4" /></TableCell>
						<TableCell>{data.num}</TableCell>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{data.qty}</TableCell>
						<TableCell>{data.label}</TableCell>
						<TableCell>{data.flag}</TableCell>
					</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
