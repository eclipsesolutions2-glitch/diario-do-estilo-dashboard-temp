import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Subscriber } from "@/core/contracts/newsletter";
import { getAvatarFallback } from "@/lib/formats/format-avatar-fallback";
import { formatDate } from "@/lib/formats/format-date";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Subscriber>[] = [
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
		header: () => <div className="font-bold">Subscritor</div>,
		cell: ({ row }) => (
			<div className="flex gap-2">
				<Avatar className="size-10">
					<AvatarFallback>
						{getAvatarFallback(row.original.name)}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<span>{row.original.name}</span>
					<span className="text-xs max-w-40 text-muted-foreground  overflow-hidden text-ellipsis whitespace-nowrap">
						{`@${row.original.email}`}
					</span>
				</div>
			</div>
		),
	},
	{
		accessorKey: "is_subscribed",
		header: () => <div className="font-bold text-center">Status</div>,
		cell: ({ row }) => {
			const role = row.original.is_subscribed;

			const roleColors: Record<string, string> = {
				true: "bg-blue-500/15 text-blue-700 border-blue-500/20",
				false: "bg-sky-500/15 text-sky-700 border-sky-500/20",
			};

			return (
				<div className="text-center">
					<Badge
						className={cn(
							"rounded-none border border-transparent font-medium",
							roleColors[`${role}`],
						)}
					>
						{row.original.is_subscribed
							? "Subscrito"
							: "Não subscrito"}
					</Badge>
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
];
