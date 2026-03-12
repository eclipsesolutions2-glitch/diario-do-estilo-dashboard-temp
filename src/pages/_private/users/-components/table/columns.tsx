import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User, UserRole } from "@/core/contracts/users";
import { getAvatarFallback } from "@/lib/formats/format-avatar-fallback";
import { cn } from "@/lib/utils";
import { UserRowActions } from "./actions/user-row-actions";

export function formatRole(role: UserRole): string {
	switch (role) {
		case "admin":
			return "Administrador";
		case "editor":
			return "Editor";
		case "reader":
			return "Leitor";
		default:
			return "Desconhecido";
	}
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center font-bold">Id</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					{String(row.original.id).padStart(4, "0")}
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: () => <div className="font-bold">Nome</div>,
		cell: ({ row }) => {
			const name = row.getValue("name") as string;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="size-10">
						<AvatarImage
							src={row.original.avatar_url}
							alt={`Foto de perfil do ${row.original.name}`}
						/>
						<AvatarFallback>
							{getAvatarFallback(row.original.name)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span>{name}</span>
						<span
							title={row.original.email}
							className="text-xs max-w-40 text-muted-foreground  overflow-hidden text-ellipsis whitespace-nowrap"
						>
							{row.original.email}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "is_deactivated",
		header: () => <div className="font-bold text-center">Status</div>,
		cell: ({ row }) => {
			const statusColors: Record<string, string> = {
				false: "bg-green-500/15 text-green-700 border-green-500/20",
				true: "bg-red-500/15 text-red-700 border-red-500/20",
			};

			return (
				<div className="text-center">
					<Badge
						className={cn(
							"rounded-none border border-transparent font-medium",
							statusColors[
								row.original.is_deactivated.toString()
							],
						)}
					>
						{row.original.is_deactivated ? "Inativo" : "Ativo"}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: () => <div className="font-bold">Permissão</div>,
		cell: ({ row }) => {
			const role = row.original.role;

			const roleColors: Record<string, string> = {
				admin: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
				editor: "bg-blue-500/15 text-blue-700 border-blue-500/20",
				reader: "bg-sky-500/15 text-sky-700 border-sky-500/20",
			};

			return (
				<Badge
					className={cn(
						"rounded-none border border-transparent font-medium",
						roleColors[role],
					)}
				>
					{formatRole(role)}
				</Badge>
			);
		},
	},
	{
		accessorKey: "actions",
		header: undefined,
		cell: ({ row }) => <UserRowActions row={row.original} />,
	},
];
