import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-8">
			<div className="flex items-center gap-2.5">
				<Skeleton className="w-32 h-5" />
				<Skeleton className="w-32 h-5" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
				<Skeleton className="w-full h-[20rem] lg:h-[30rem]" />
				<div className="lg:py-16 space-y-8">
					<div className="space-y-4">
						<Skeleton className="h-6 lg:h-8 w-48" />
						<div className="space-y-2">
							<Skeleton className="h-4 lg:h-5 w-full" />
							<Skeleton className="h-4 lg:h-5 w-full" />
						</div>
					</div>
					<Skeleton className="h-6 lg:h-8 w-28" />
					<Skeleton className="h-9 w-full" />
				</div>
			</div>
		</div>
	);
}
