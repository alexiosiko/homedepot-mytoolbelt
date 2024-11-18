"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';

export default function Page() {
	const router = useRouter();
	const [bayId, setBayId] = useState<string>("");
	const [bayIds, setBayIds] = useState<string[] | null>(null);
	const handleSetBayId = (s: string) => {
		s =  s.replace(/\D/g, '');
		if (s.length > 5)
			return;
		setBayId(s);
	}
	const handleSubmit = () => {
		if (bayId.length != 5 && bayId.length != 4) {
			toast({
				title: "Bay id invalid",
				description: 'A correct bay id example is "13024"',
				variant: "destructive",
			});
			return;
		} 

		router.push(`/sequencing/${bayId}`);
	}
	const getBays = async () => {
		const res = await axios.get(`/api/sequencing`);
		if (res.status != 200) {
			toast({ 
				title: "Erorr fetching existing bays",
				variant: "destructive"
			});
			return;
		}
		setBayIds(res.data.bayIds);
	}
	useEffect(() => {
		getBays();
	}, []);
  return (
	<div className='flex justify-center items-center h-screen'>

		<Card className='w-min m-auto'>
			<CardHeader>
				<div className='flex gap-2 items-center mx-auto justify-center'>
					<Input placeholder='Enter bay id'
					onKeyDown={(e) => {if (e.key == "Enter") handleSubmit();}} 
					className='w-48' value={bayId} 
					onChange={(e) => handleSetBayId(e.target.value)} />
					<Button  onClick={handleSubmit}>Sequence Bay</Button>
				</div>
				
			</CardHeader>
			<CardContent>
				<div className='flex gap-2 mt-4 flex-wrap items-center'>
					<p className=''>Existing bays:</p>
						{bayIds ?
							bayIds.map(id => 
								<Button variant="outline"  onClick={() => router.push(`/sequencing/${id}`)} key={id}>
									{id}
								</Button>
							) :
							<ClipLoader />
						}
				</div>
				
			</CardContent>
		</Card>
	</div>
  )
}
