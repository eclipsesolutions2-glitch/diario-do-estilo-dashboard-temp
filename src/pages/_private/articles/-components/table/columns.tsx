import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/core/contracts/articles";
import { cn } from "@/lib/utils";
import { ArticleRowActions } from "./actions/article-row-actions";

export const columns: ColumnDef<Article>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center font-bold">ID</div>,
		cell: ({ row }) => (
			<div className="text-center text-xs tabular-nums">
				{String(row.original.id).padStart(4, "0")}
			</div>
		),
	},

	{
		accessorKey: "cover_image",
		header: () => <div className="text-center font-bold">Capa</div>,
		cell: ({ row }) => {
			return (
				<div className="flex justify-center">
					<div className="relative h-10 w-16 border overflow-hidden">
						<img
							src={row.original.cover_image}
							alt="Capa do artigo"
							className="object-cover"
						/>
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: "title",
		header: () => <div className="font-bold">Título</div>,
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5 max-w-56">
				<span className="text-sm font-medium truncate">
					{row.original.title}
				</span>
				<span className="text-xs text-muted-foreground line-clamp-1">
					{row.original.excerpt || row.original.content}
				</span>
			</div>
		),
	},
	{
		accessorKey: "view_count",
		header: () => <div className="font-bold text-center">Views</div>,
		cell: ({ row }) => (
			<div className="text-center">
				<Badge className="bg-neutral-500/15 text-neutral-700 rounded-none">
					{row.original.view_count}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: "author",
		header: () => <div className="font-bold">Autor</div>,
		cell: ({ row }) =>
			row.original.author ? (
				<span className="text-sm">{row.original.author.name}</span>
			) : (
				<span className="text-muted-foreground">—</span>
			),
	},
	{
		accessorKey: "is_in_newsletter",
		header: () => <div className="text-center font-bold">Newsletter</div>,
		cell: ({ row }) => {
			const active = row.original.is_in_newsletter;

			return (
				<div className="flex items-center justify-center">
					<Badge
						className={cn(
							"flex items-center gap-1.5 rounded-none px-2 py-1 text-xs font-medium",
							active
								? "bg-emerald-500/10 text-emerald-700"
								: "bg-muted text-muted-foreground",
						)}
					>
						{active ? "Na Newsletter" : "—"}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "is_published",
		header: () => <div className="text-center font-bold">Status</div>,
		cell: ({ row }) => (
			<div className="flex flex-col items-center gap-1">
				<Badge
					className={
						row.original.is_published
							? "bg-emerald-500/15 text-emerald-700 rounded-none"
							: "bg-yellow-500/15 text-yellow-700 rounded-none"
					}
				>
					{row.original.is_published ? "Publicado" : "Rascunho"}
				</Badge>
			</div>
		),
	},

	{
		accessorKey: "is_featured",
		header: () => <div className="text-center font-semibold">Destaque</div>,
		cell: ({ row }) => {
			const isFeatured = row.original.is_featured;

			return (
				<div className="flex justify-center">
					<Badge
						className={
							isFeatured
								? "bg-violet-500/20 text-violet-800 rounded-none"
								: "bg-muted text-muted-foreground rounded-none"
						}
					>
						{isFeatured ? "Em destaque" : "Sem destaque"}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "actions",
		header: undefined,
		cell: ({ row }) => <ArticleRowActions row={row.original} />,
	},
];
