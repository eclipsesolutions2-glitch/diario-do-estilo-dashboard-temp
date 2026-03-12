import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoreActionsProps {
	children: React.ReactNode;
	label?: string;
}

function MoreActions({ children, label = "Ações" }: MoreActionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-none">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="rounded-none">
				<DropdownMenuLabel>{label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

MoreActions.Item = DropdownMenuItem;
MoreActions.Separator = DropdownMenuSeparator;

export { MoreActions };
