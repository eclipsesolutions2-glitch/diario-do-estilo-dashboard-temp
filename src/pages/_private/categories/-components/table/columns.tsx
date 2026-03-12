import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/core/contracts/categories";
import { formatDate } from "@/lib/formats/format-date";
import { CategoryRowActions } from "./actions/category-row-actions";

export const columns: ColumnDef<Category>[] = [
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
		accessorKey: "name",
		header: () => <div className="font-bold">Nome</div>,
		cell: ({ row }) => {
			const name = row.getValue("name") as string;
			return (
				<div className="flex flex-col">
					<span>{name}</span>
					<span className="text-xs max-w-40 text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
						{row.original.description}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "slug",
		header: () => <div className="font-bold">Slug</div>,
		cell: ({ row }) => (
			<Badge className="rounded-none border bg-primary/30 text-primary">
				{row.original.slug}
			</Badge>
		),
	},
	{
		accessorKey: "created_by",
		header: () => <div className="font-bold">Autor</div>,
		cell: ({ row }) => {
			if (!row.original.created_by) return "---";
			return (
				<div className="flex flex-col">
					<span>{row.original.created_by.name}</span>
					<span className="text-xs text-muted-foreground">
						{row.original.created_by.email}
					</span>
				</div>
			);
		},
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
	{
		accessorKey: "actions",
		header: undefined,
		cell: ({ row }) => <CategoryRowActions row={row.original} />,
	},
];
