import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { RecentArticle } from "@/core/contracts/overview";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<
	RecentArticle["status"],
	{ bg: string; text: string }
> = {
	Publicado: {
		bg: "bg-emerald-500/15",
		text: "text-emerald-700",
	},
	Rascunho: {
		bg: "bg-amber-500/15",
		text: "text-amber-700",
	},
	Excluído: {
		bg: "bg-red-500/15",
		text: "text-red-700",
	},
};

export const columns: ColumnDef<RecentArticle>[] = [
	{
		accessorKey: "id",
		header: () => (
			<div className="text-center text-xs uppercase tracking-wide">
				ID
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center font-mono text-sm">
				{String(row.original.id).padStart(4, "0")}
			</div>
		),
	},

	{
		accessorKey: "title",
		header: () => (
			<div className="text-xs uppercase tracking-wide">Título</div>
		),
		cell: ({ row }) => {
			const status = row.original.status;
			const image =
				status === "Excluído"
					? "/images/placeholder.svg"
					: row.original.cover_url;

			return (
				<div className="flex items-center gap-3">
					<div className="relative h-10 w-16 border border-border overflow-hidden">
						<img
							src={image}
							alt={row.original.title}
							className="object-cover"
						/>
					</div>

					<div className="max-w-48 overflow-hidden">
						<p className="truncate text-sm font-medium">
							{row.original.title}
						</p>
						<p className="truncate text-xs text-muted-foreground">
							{row.original.slug}
						</p>
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: "author",
		header: () => (
			<div className="text-xs uppercase tracking-wide">Autor</div>
		),
		cell: ({ row }) => (
			<div className="max-w-48 truncate text-sm">
				{row.original.author}
			</div>
		),
	},

	{
		accessorKey: "status",
		header: () => (
			<div className="text-center text-xs uppercase tracking-wide">
				Status
			</div>
		),
		cell: ({ row }) => {
			const status = row.original.status;
			const styles = STATUS_STYLES[status];

			return (
				<div className="text-center">
					<Badge
						className={cn(
							"rounded-none border border-transparent px-2 py-0.5 text-xs font-medium",
							styles?.bg,
							styles?.text,
						)}
					>
						{status}
					</Badge>
				</div>
			);
		},
	},
];
