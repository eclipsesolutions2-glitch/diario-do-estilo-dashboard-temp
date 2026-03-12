"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type ArticlesPerDayChartProps = {
	labels: string[];
	created: number[];
	read: number[];
	title?: string;
	description?: string;
};

const chartConfig = {
	created: {
		label: "Criados",
		color: "var(--chart-1)",
	},
	read: {
		label: "Lidos",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function ArticlesPerDayChart({
	labels,
	created,
	read,
	title = "Artigos por dia",
	description = "Últimos 30 dias",
}: ArticlesPerDayChartProps) {
	const chartData = labels.map((label, i) => ({
		date: label,
		created: created[i],
		read: read[i],
	}));

	return (
		<Card className="rounded-none border border-border shadow-none">
			<CardHeader className="pb-2 space-y-1">
				<CardTitle className="text-base font-semibold tracking-tight">
					{title}
				</CardTitle>
				<CardDescription className="text-xs uppercase tracking-wide">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="pt-2">
				<ChartContainer config={chartConfig} className="h-52 w-full">
					<LineChart
						data={chartData}
						margin={{ top: 16, left: 16, right: 16 }}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							className="stroke-border"
						/>

						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tickMargin={12}
							className="text-xs fill-muted-foreground"
						/>

						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									indicator="line"
									hideLabel
									className="rounded-none text-xs"
								/>
							}
						/>

						<Line
							dataKey="created"
							type="monotone"
							stroke="var(--chart-1)"
							strokeWidth={2}
							dot={false}
						/>

						<Line
							dataKey="read"
							type="monotone"
							stroke="var(--chart-2)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="flex-col items-start gap-1 border-t border-border pt-3 text-xs">
				<div className="flex items-center gap-1 font-medium">
					Tendência mensal
					<TrendingUp className="h-3.5 w-3.5" />
				</div>
				<span className="text-muted-foreground">
					Artigos criados e lidos por dia
				</span>
			</CardFooter>
		</Card>
	);
}
