import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
	return (
		<div className="space-y-4 mt-8">
			<Skeleton className="h-6 w-40" />
			<div className="rounded-none border">
				<div className="grid grid-cols-4 gap-4 border-b p-4">
					<Skeleton className="h-4 w-10" />
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-6" />
				</div>
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={`${i + 2}-2`}
						className="grid grid-cols-4 items-center gap-4 border-b p-4 last:border-none"
					>
						<Skeleton className="h-4 w-12" />

						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 min-w-10 min-h-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-40" />
								<Skeleton className="h-3 w-32" />
							</div>
						</div>

						<Skeleton className="h-6 w-20 rounded-md" />
						<Skeleton className="h-6 w-6 rounded-full" />
					</div>
				))}
			</div>
		</div>
	);
}
