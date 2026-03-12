import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

interface DetailsMoreActionProps {
	slug: string;
}

export function DetailsMoreAction({ slug }: DetailsMoreActionProps) {
	return (
		<Link to="/articles/$slug" params={{ slug }}>
			{({ isTransitioning }) => (
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					className="rounded-none gap-2"
				>
					{isTransitioning ? (
						<Spinner className="h-4 w-4" />
					) : (
						<Info className="h-4 w-4" />
					)}
					<span>Detalhes</span>
				</DropdownMenuItem>
			)}
		</Link>
	);
}
