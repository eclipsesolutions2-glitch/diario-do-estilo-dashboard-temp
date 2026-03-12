import { cn } from "@/lib/utils";

interface OverviewCardIconProps extends React.ComponentProps<"div"> {
	icon: React.ElementType;
}

export function OverviewCardIcon({
	icon: Icon,
	className,
	...props
}: OverviewCardIconProps) {
	return (
		<div
			{...props}
			className={cn(
				"size-11 shrink-0 flex items-center justify-center rounded-none",
				"text-neutral-100 bg-neutral-700",
				className,
			)}
		>
			<Icon className="size-5" />
		</div>
	);
}
