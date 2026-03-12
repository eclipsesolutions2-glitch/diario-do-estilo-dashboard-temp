import {
	OverviewCard,
	OverviewCardContent,
	OverviewCardIcon,
} from "@/components/overview-card";
import type { Summary } from "@/core/contracts/overview";
import { OVERVIEW_CARD_ITEMS } from "./data";

interface OverviewStatsProps {
	data: Summary;
}
export function OverviewStats({ data: summary }: OverviewStatsProps) {
	const dynamicCards = OVERVIEW_CARD_ITEMS.map((item) => ({
		...item,
		amount: summary[item.totalsKey],
	}));
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{dynamicCards.map((item, idx) => (
				<OverviewCard key={item.id}>
					<OverviewCardIcon
						icon={item.icon}
						className={
							idx === 0 || idx === 7
								? "text-green-600 bg-green-400/10"
								: idx === 1 || idx === 6
									? "text-blue-600 bg-blue-400/10"
									: idx === 2 || idx === 5
										? "text-amber-600 bg-amber-400/10"
										: idx === 3 || idx === 4
											? "text-lime-600 bg-lime-400/10"
											: ""
						}
					/>
					<OverviewCardContent
						title={item.title}
						value={item.amount}
						description={item.description}
					/>
				</OverviewCard>
			))}
		</div>
	);
}
