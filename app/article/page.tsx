"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { formatArticleNumber } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Page() {
	const router = useRouter();
	const [articleNum, setArticleNum] = useState<string>("1001099459");
	const handleHandleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		
		// Allow only numeric input, I found this piece of code ONLINE
		if (/^\d*$/.test(value))
			setArticleNum(value);

	};
	const handleSubmit = () => {
		try {
			const num = formatArticleNumber(articleNum);
			router.push(`/article/${num}`);
		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		}
	}
  return (
	<div>

	<Input onKeyDown={(e) => {if (e.key == "Enter") handleSubmit();}} value={articleNum} onChange={handleHandleUpdateInput} placeholder='Insert article number ...' />
	<Button onClick={handleSubmit}>Search</Button>
	</div>
  )
}
