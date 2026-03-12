"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

type CategoryData = {
	label: string;
	value: number;
};

type ArticlesByCategoryChartProps = {
	data: CategoryData[];
	title?: string;
	description?: string;
};

const chartConfig = {
	value: {
		label: "Artigos",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

export function ArticlesByCategoryChart({
	data,
	title = "Artigos por categoria",
	description = "Distribuição total",
}: ArticlesByCategoryChartProps) {
	const chartData = data.map((item) => ({
		category: item.label,
		value: item.value,
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
				<ChartContainer
					config={chartConfig}
					className="h-52 w-full rounded-none"
				>
					<BarChart data={chartData}>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							className="stroke-border"
						/>

						<XAxis
							dataKey="category"
							axisLine={false}
							tickLine={false}
							tickMargin={16}
							tickFormatter={(value) => value.slice(0, 10)}
							className="text-xs fill-muted-foreground"
						/>

						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									className="rounded-none text-xs"
								/>
							}
						/>

						<Bar dataKey="value" fill="var(--chart-1)" radius={0} />
					</BarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="flex-col items-start gap-1 border-t border-border pt-3 text-xs">
				<div className="flex items-center gap-1 font-medium">
					Crescimento mensal
					<TrendingUp className="h-3.5 w-3.5" />
				</div>
				<span className="text-muted-foreground">
					Artigos agrupados por categoria
				</span>
			</CardFooter>
		</Card>
	);
}
