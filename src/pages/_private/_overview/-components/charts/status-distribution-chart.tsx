"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type StatusDistribution = {
	published: number;
	draft: number;
	trashed: number;
};

type StatusDistributionChartProps = {
	data: StatusDistribution;
	title?: string;
	description?: string;
};

const chartConfig = {
	published: { label: "Publicado" },
	draft: { label: "Rascunho" },
	trashed: { label: "Excluído" },
};

const COLORS = {
	published: "var(--chart-2)",
	draft: "var(--chart-5)",
	trashed: "var(--chart-1)",
};

export function StatusDistributionChart({
	data,
	title = "Distribuição de status",
	description = "Artigos por status",
}: StatusDistributionChartProps) {
	const chartData = React.useMemo(
		() => [
			{ key: "published", name: "Publicado", value: data.published },
			{ key: "draft", name: "Rascunho", value: data.draft },
			{ key: "trashed", name: "Excluído", value: data.trashed },
		],
		[data],
	);

	const total = data.published + data.draft + data.trashed;

	return (
		<Card className="rounded-none border border-border shadow-none">
			<CardHeader className="items-center pb-2 space-y-1">
				<CardTitle className="text-base font-semibold">
					{title}
				</CardTitle>
				<CardDescription className="text-xs uppercase tracking-wide">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex justify-center pt-2 pb-0">
				<ChartContainer
					config={chartConfig}
					className="aspect-square h-52"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									className="rounded-none text-xs"
								/>
							}
						/>

						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							innerRadius={70}
							outerRadius={95}
							stroke="hsl(var(--border))"
							strokeWidth={1}
						>
							{chartData.map((entry) => (
								<Cell
									key={entry.key}
									fill={
										COLORS[entry.key as keyof typeof COLORS]
									}
								/>
							))}

							<Label
								content={({ viewBox }) => {
									if (!viewBox || !("cx" in viewBox))
										return null;

									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan className="fill-foreground text-2xl font-semibold">
												{total.toLocaleString()}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy ?? 0) + 18}
												className="fill-muted-foreground text-xs uppercase tracking-wide"
											>
												Artigos
											</tspan>
										</text>
									);
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="flex-col items-start gap-1 border-t border-border pt-3 text-xs">
				<div className="flex items-center gap-1 font-medium">
					Crescimento mensal
					<TrendingUp className="h-3.5 w-3.5" />
				</div>
				<span className="text-muted-foreground">
					Total de artigos por status
				</span>
			</CardFooter>
		</Card>
	);
}
