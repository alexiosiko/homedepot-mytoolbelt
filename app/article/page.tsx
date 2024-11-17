import Search from "@/components/article/search"

export default function Page() {
  return (
		<div className="h-screen flex justify-center items-center">
			<div>
				<Search />
				<h1>Search a product by it's article number</h1>
				<p className='text-sm mt-4'>This data is retrieved using Home Depot's product API </p>
				<p className="text-sm mt-4">Please note that the GET requests may occasionally fail due to Home Depot's API security measures and spam prevention protocols.</p>		
			</div>
		</div>
  )
}
