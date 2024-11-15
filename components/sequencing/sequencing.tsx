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

export function Sequencing({
	articles,
	setArticles,
	bayId,
	setSelectedIndexes,
	handleSelectAll,
	handleCheckboxChange,
	selectedIndexes,
}: ReturnType<typeof useSequencing>) {
	return (
		<Tabs defaultValue="add">
			<TabsList className="grid grid-cols-2">
				<TabsTrigger value="add">Add Article</TabsTrigger>
				<TabsTrigger value="search">In-Bay Search</TabsTrigger>
			</TabsList>
			<p>Bay: {bayId}</p>
			<TabsContent value="add">
				<SequencingEdit
					bayId={bayId}
					articles={articles}
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
					selectedIndexes={selectedIndexes} />
			</TabsContent>
    </Tabs>
  )
}

