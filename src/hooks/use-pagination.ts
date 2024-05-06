import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePagination = (totalPages: number) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	function firstPage() {
		const params = new URLSearchParams(searchParams);

		params.set("page", "1");

		router.push(`${pathname}?${params.toString()}`);
	}

	function nextPage() {
		if (currentPage + 1 > totalPages) {
			return;
		}
		const params = new URLSearchParams(searchParams);

		params.set("page", String(currentPage + 1));

		router.push(`${pathname}?${params.toString()}`);
	}

	function previousPage() {
		if (currentPage - 1 < 0) {
			return;
		}
		const params = new URLSearchParams(searchParams);

		params.set("page", String(currentPage - 1));

		router.push(`${pathname}?${params.toString()}`);
	}

	function lastPage() {
		const params = new URLSearchParams(searchParams);

		params.set("page", String(totalPages));

		router.push(`${pathname}?${params.toString()}`);
	}
	return {
		firstPage,
		previousPage,
		nextPage,
		lastPage,
		currentPage,
	};
};
