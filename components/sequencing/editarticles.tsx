import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArticleType } from "./hooks/useSequencing"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dispatch, SetStateAction, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { DialogDescription } from "@radix-ui/react-dialog"
import { v4 as uuidv4 } from 'uuid';

export default function EditArticles({ data, setData, selectedIndexes, setSelectedIndexes }: {
	data: ArticleType[];
	selectedIndexes: Set<number>;
	setData: Dispatch<SetStateAction<ArticleType[]>>;
	setSelectedIndexes: Dispatch<SetStateAction<Set<number>>>;
}) {
	const { toast } = useToast();
	const [dialogIsActive, setDialogIsActive] = useState(false);

	const [qty, setQty] = useState<string>("");
	const [flag, setFlag] = useState<string>("");
	const [label, setLabel] = useState<string>("");

	const saveChanges = () => {
		selectedIndexes.forEach(index => {
			const d = data[index];

			// Copy
			const newData: ArticleType = {
				objectid: uuidv4(),
				num: d.num,
				qty: qty == "" ? d.qty : qty,
				label: label == "" ? d.label : label,
				flag: flag == "" ? d.flag : flag,
			}

			data[index] = newData;
		})
		setData([...data]);
		toast({
			duration: 2500,
			title: "Successfully updated articles.",
		})
		setSelectedIndexes(new Set());
		setDialogIsActive(false);
	}
	return (
		<Dialog open={dialogIsActive}>
			<DialogTrigger asChild>
				<Button variant="outline" disabled={selectedIndexes.size == 0} onClick={() => setDialogIsActive(true)}>Edit Articles</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader >
					<DialogTitle>Edit Articles</DialogTitle>
					<DialogDescription>Adjust values to update all currently selected articles.</DialogDescription>
				</DialogHeader>
				<div>
					<Label htmlFor="name" className="mt-4">
					Qty
					</Label>
					<Input
						autoComplete="off"
						type="number"
						id="qty"
						value={qty.toString()}
						onChange={(e) => setQty(e.target.value)} // Updates qty state on change
					/>
					<Label htmlFor="username" className="mt-4">
					Flag
					</Label>
					<Select onValueChange={(value) => setFlag(value)} value={flag}>
						<SelectTrigger >
							<SelectValue/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
							<SelectItem value="None">None</SelectItem>
							<SelectItem value="Quarter Pallet">Quarter Pallet</SelectItem>
							<SelectItem value="Clipstrip">Clipstrip</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Label htmlFor="username" className="">
					Label
					</Label>
					<Select onValueChange={(value) => setLabel(value)} value={label}>
						<SelectTrigger >
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
							<SelectItem value="Regular BC">Regular BC</SelectItem>
							<SelectItem value="Regular Bin">Regular Bin</SelectItem>
							<SelectItem value="Regular Pallet">Regular Pallet</SelectItem>
							<SelectItem value="LHT">LHT</SelectItem>
							<SelectItem value="SHT">SHT</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<DialogFooter className="gap-y-2">
					<Button variant="destructive" onClick={() => setDialogIsActive(false)}>Cancel</Button>
					<Button onClick={saveChanges}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
