import { Info } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverviewCardContentProps {
	title: string;
	description: string;
	value: number;
	variant?: "default" | "percent";
}

export function OverviewCardContent({
	title,
	description,
	value,
	variant = "default",
}: OverviewCardContentProps) {
	const formatted =
		variant === "percent"
			? `${value.toLocaleString()}%`
			: value.toLocaleString();

	return (
		<div className="flex flex-col gap-2 w-full min-w-0">
			<div className="flex items-start justify-between gap-2">
				<span
					className="text-sm sm:text-base font-medium text-foreground leading-tight line-clamp-2 max-w-[9.5ch]"
					title={title}
				>
					{title}
				</span>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
						>
							<Info className="size-4 sm:size-5" />
						</button>
					</TooltipTrigger>
					<TooltipContent side="top" align="end">
						<p className="text-sm leading-relaxed max-w-xs">
							{description}
						</p>
					</TooltipContent>
				</Tooltip>
			</div>

			<span className="text-xl sm:text-2xl font-semibold text-foreground text-right leading-none tabular-nums">
				{formatted}
			</span>
		</div>
	);
}
