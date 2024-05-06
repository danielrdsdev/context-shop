"use client";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

export const Pagination = ({
	currentPage,
	totalPages,
}: { currentPage: number; totalPages: number }) => {
	const { firstPage, previousPage, nextPage, lastPage } =
		usePagination(totalPages);

	return (
		<div className="flex items-center justify-between">
			<p className="text-muted-foreground">
				Página <span className="text-primary font-medium">{currentPage}</span>{" "}
				de <span className="text-primary font-medium">{totalPages}</span>
			</p>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="icon"
					onClick={firstPage}
					disabled={currentPage - 1 <= 0}
				>
					<DoubleArrowLeftIcon className="size-5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={previousPage}
					disabled={currentPage - 1 <= 0}
				>
					<ChevronLeftIcon className="size-5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={nextPage}
					disabled={currentPage + 1 > totalPages}
				>
					<ChevronRightIcon className="size-5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={lastPage}
					disabled={currentPage + 1 > totalPages}
				>
					<DoubleArrowRightIcon className="size-5" />
				</Button>
			</div>
		</div>
	);
};
