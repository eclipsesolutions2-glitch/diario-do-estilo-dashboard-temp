import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { HistorySentArticleItem } from "@/core/contracts/newsletter";
import { getAvatarFallback } from "@/lib/formats/format-avatar-fallback";
import { formatDate } from "@/lib/formats/format-date";

export const columns: ColumnDef<HistorySentArticleItem>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center font-bold">Id</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{String(row.original.id).padStart(4, "0")}
			</div>
		),
	},
	{
		accessorKey: "sender",
		header: () => <div className="font-bold">Emissor</div>,
		cell: ({ row }) => (
			<div className="flex gap-2">
				<Avatar className="size-10">
					<AvatarFallback>
						{getAvatarFallback(row.original.sender.name)}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<span>{row.original.sender.name}</span>
					<span className="text-xs max-w-40 text-muted-foreground  overflow-hidden text-ellipsis whitespace-nowrap">
						{`@${row.original.sender.email}`}
					</span>
				</div>
			</div>
		),
	},
	{
		accessorKey: "article",
		header: () => <div className="font-bold">Artigo</div>,
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{row.original.article ? row.original.article.title : "---"}
			</div>
		),
	},
	{
		accessorKey: "created_at",
		header: () => <div className="font-bold text-center">Criado em</div>,
		cell: ({ row }) => (
			<div className="text-center text-muted-foreground">
				{formatDate(row.original.created_at)}
			</div>
		),
	},
];
