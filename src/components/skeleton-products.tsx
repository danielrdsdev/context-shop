import { Skeleton } from "./ui/skeleton";

export const SkeletonProducts = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{[...Array(9)].map((_, item) => (
				<div
					key={`${item + 1}`}
					className="bg-muted/50 border rounded-md p-6 space-y-4"
				>
					<Skeleton className="w-full h-[15rem]" />

					<div className="space-y-3">
						<div className="space-y-2">
							<Skeleton className="h-5 w-48" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
						</div>

						<Skeleton className="h-5 w-24" />
					</div>

					<Skeleton className="w-full h-9" />
				</div>
			))}
		</div>
	);
};
