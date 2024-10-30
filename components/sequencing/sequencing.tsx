"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import useSequencing from "./hooks/useSequencing"
import SequencingEdit from "./sequencingedit/sequencingedit"
import SequencingSearch from "./sequencingsearch/sequencingsearch"

export function Sequencing() {
	const { articles, setSelectedIndexes, setArticles, handleSelectAll, selectedIndexes, handleCheckboxChange } = useSequencing();
	return (
		<Tabs defaultValue="add" className="sm:p-2">
			<TabsList className="grid grid-cols-2">
				<TabsTrigger value="add">Add Article</TabsTrigger>
				<TabsTrigger value="search">In-Bay Search</TabsTrigger>
			</TabsList>
			<TabsContent value="add">
				<SequencingEdit articles={articles}
					handleCheckboxChange={handleCheckboxChange}
					handleSelectAll={handleSelectAll}
					selectedIndexes={selectedIndexes}
					setArticles={setArticles}
					setSelectedIndexes={setSelectedIndexes}
				/>
			</TabsContent>
			<TabsContent value="search">
				<SequencingSearch
					setSelectedIndexes={setSelectedIndexes}
					setArticles={setArticles}
					articles={articles}
					handleCheckboxChange={handleCheckboxChange}
					handleSelectAll={handleSelectAll}
					selectedIndexes={selectedIndexes} />
			</TabsContent>
    </Tabs>
  )
}

