import { ProductCard } from "@/components/product-card";
import { Product } from "@/types";

const getData = async (
	search: string,
	page: number,
): Promise<Product[] | undefined> => {
	try {
		const res = await fetch(
			`https://6638fd044253a866a24fe735.mockapi.io/Products?page=${page}&limit=9&search=${search}`,
			{
				next: {
					revalidate: 60,
				},
			},
		);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export const GetProducts = async ({
	search,
	currentPage,
}: { search: string; currentPage: number }) => {
	const data = await getData(search, currentPage);

	if (!data) {
		return null;
	}

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{filteredData.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
