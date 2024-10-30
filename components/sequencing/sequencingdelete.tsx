import React from 'react'
import { Button } from '../ui/button'
import { ArticleType } from './hooks/useSequencing'
import { toast } from '@/hooks/use-toast'

export default function SequencingDelete({ setArticles, selectedIndexes, setSelectedIndexes }: {
	setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>
	selectedIndexes: Set<number>,
	setSelectedIndexes: React.Dispatch<React.SetStateAction<Set<number>>>,
}) {
	const handleDelete = () => {
		try {
			setArticles((prevArticles) =>
				prevArticles.filter((_, index) => !selectedIndexes.has(index))
			);
			toast({
				title: `Successfully deleted ${selectedIndexes.size} articles.`,
				duration: 2500,
			})
			setSelectedIndexes(new Set());
		} catch (e: unknown) {
			const error = e as Error
			toast({
				duration: 2500,
				title: "Error deleting articles.",
				description: error.message,
				variant: "destructive",
			})
		}

	}
  return (
	<Button variant="destructive" disabled={selectedIndexes.size == 0
	} onClick={handleDelete}>
		Delete
	</Button>

)

}
