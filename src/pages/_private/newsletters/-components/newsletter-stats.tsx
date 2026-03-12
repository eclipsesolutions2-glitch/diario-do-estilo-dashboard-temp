import { CheckCircle, TrendingUp, Users, XCircle } from "lucide-react";
import {
	OverviewCard,
	OverviewCardContent,
	OverviewCardIcon,
} from "@/components/overview-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuerySubscriberState } from "@/core/actions/newsletter/query-state-newsletter";

export function NewsLetterStats() {
	const { data: stats, isPending } = useQuerySubscriberState();

	if (isPending) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<Skeleton className="h-28 rounded-none" />
				<Skeleton className="h-28 rounded-none" />
				<Skeleton className="h-28 rounded-none" />
				<Skeleton className="h-28 rounded-none" />
			</div>
		);
	}

	const dynamicCards = stats.data
		? [
				{
					id: "total",
					title: "Total de inscritos",
					amount: stats.data.total,
					description: "Todos os subscritores",
					icon: Users,
				},
				{
					id: "active",
					title: "Ativos",
					amount: stats.data.active,
					description: "Subscritores ativos",
					icon: CheckCircle,
				},
				{
					id: "inactive",
					title: "Inativos",
					amount: stats.data.inactive,
					description: "Subscritores inativos",
					icon: XCircle,
				},
				{
					id: "active_rate",
					title: "Taxa de ativação",
					amount: stats.data.active_rate,
					description: "Percentagem de ativos",
					icon: TrendingUp,
				},
			]
		: [];
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{dynamicCards.map((item, idx) => (
				<OverviewCard key={item.id}>
					<OverviewCardIcon
						icon={item.icon}
						className={
							idx === 0 || idx === 7
								? "text-blue-600 bg-blue-400/10"
								: idx === 1 || idx === 6
									? "text-green-600 bg-green-400/10"
									: idx === 2 || idx === 5
										? "text-red-600 bg-red-400/10"
										: idx === 3 || idx === 4
											? "text-lime-600 bg-lime-400/10"
											: ""
						}
					/>
					<OverviewCardContent
						title={item.title}
						value={+item.amount}
						description={item.description}
						variant={
							item.id.includes("active_rate")
								? "percent"
								: "default"
						}
					/>
				</OverviewCard>
			))}
		</div>
	);
}
