import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotFoundProps extends React.ComponentProps<"div"> {
	label: string;
	icon?: React.ElementType;
}

export const NotFoundEntities = ({
	label = "Nenhum dado encontrado",
	icon: Icon = SearchX,
	className,
	...props
}: NotFoundProps) => {
	return (
		<div
			{...props}
			className={cn(
				"flex flex-col items-center gap-2 text-muted-foreground",
				className,
			)}
		>
			<Icon size={32} />
			<span>{label}</span>
		</div>
	);
};
