import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useState } from 'react'
import { ArticleType } from '../hooks/useSequencing';
import { useRouter } from 'next/navigation';

export default function SequencingSave({ bayId, articles }: {
	bayId: string,
	articles: ArticleType[],
}) {
	const router = useRouter();
	const [saving, setSaving] = useState<boolean>(false);
	const handleSave = async () => {
		setSaving(true);
		try {
			if (articles.length == 0) 
				handleDelete();
			else
				handleUpdate();
			toast({
				title: "Bay saved.",
				duration: 2000
			})
		} catch (e) {
			console.error(e);
			toast({
				title: "Error saving.",
				variant: "destructive",
				duration: 2000,
			});
		} finally {
			setSaving(false);
		}

	}

	const handleDelete = async () => {
		const res = await axios.delete(`/api/sequencing`, {
			params: { bayId }
		})
		if (res.status == 200) {
			toast({
				title: "Successfully deleted bay.",
				duration: 2000,
			});
			router.push('/sequencing');
		}
		else
			throw Error("Error deleting articles and bay");
	}
	const handleUpdate = async () => {
		const res = await axios.put(`/api/sequencing`, {
			bayId: bayId,
			articles: articles
		})
		if (res.status == 200) {
			toast({
				title: "Updated bay.",
				duration: 2000,
			})
		}
	}
  return (
	<Button onClick={handleSave} disabled={saving} variant="success">Save</Button>
  )
}
