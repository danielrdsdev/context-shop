import { Search } from "@/components/search";
import { SkeletonProducts } from "@/components/skeleton-products";
import { SkeletonSearch } from "@/components/skeleton-search";
import { Suspense } from "react";
import { GetProducts } from "./_components/get-products";
import { Pagination } from "./_components/pagination";

export default function Home({
	searchParams,
}: {
	searchParams?: {
		search?: string;
		page?: string;
	};
}) {
	const search = searchParams?.search || "";
	const currentPage = Number(searchParams?.page) || 1;

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Lista de produtos
				</h1>
				<p className="text-sm text-muted-foreground">
					Procure pelo seu produto.
				</p>
			</div>

			<Suspense fallback={<SkeletonSearch />}>
				<Search placeholder="Digite o nome do produto" />
			</Suspense>

			<Suspense fallback={<SkeletonProducts />}>
				<GetProducts search={search} currentPage={currentPage} />
			</Suspense>

			<Pagination currentPage={currentPage} totalPages={11} />
		</div>
	);
}
