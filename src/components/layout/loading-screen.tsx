import { Skeleton } from "../ui/skeleton";

export function LoadingScreen() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<Skeleton className="h-10 w-72 rounded-none" />
				<Skeleton className="h-10 w-36 rounded-none" />
			</div>

			<div className="rounded-none border">
				<div className="grid grid-cols-5 gap-4 border-b p-4">
					<Skeleton className="h-4 w-10 rounded-none" />
					<Skeleton className="h-4 w-40 rounded-none" />
					<Skeleton className="h-4 w-16 rounded-none" />
					<Skeleton className="h-4 w-20 rounded-none" />
					<Skeleton className="h-4 w-6 rounded-none" />
				</div>

				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={`${i + 2}`}
						className="grid grid-cols-5 items-center gap-4 border-b p-4 last:border-none"
					>
						<Skeleton className="h-4 w-12 rounded-none" />

						<div className="flex items-center gap-3">
							<Skeleton className="min-h-10 min-w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-40 rounded-none" />
								<Skeleton className="h-3 w-32 rounded-none" />
							</div>
						</div>

						<Skeleton className="h-6 w-16 rounded-none" />
						<Skeleton className="h-6 w-20 rounded-none" />
						<Skeleton className="h-6 w-6 rounded-full" />
					</div>
				))}
			</div>

			<div className="flex items-center justify-between">
				<Skeleton className="h-4 w-40" />
				<div className="flex gap-2">
					<Skeleton className="h-9 w-24 rounded-none" />
					<Skeleton className="h-9 w-24 rounded-none" />
				</div>
			</div>
		</div>
	);
}
