"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { User } from "@/core/contracts/users";
import { getAvatarFallback } from "@/lib/formats/format-avatar-fallback";
import { cn } from "@/lib/utils";
import { UserRowActions } from "./actions/user-row-actions";

interface UserCardProps {
	data: User;
}

const ROLE_LABEL: Record<User["role"], string> = {
	admin: "Administrador",
	editor: "Editor",
	reader: "Leitor",
};

const ROLE_COLORS: Record<User["role"], string> = {
	admin: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
	editor: "bg-blue-500/15 text-blue-700 border-blue-500/20",
	reader: "bg-sky-500/15 text-sky-700 border-sky-500/20",
};

export function UserCard({ data }: UserCardProps) {
	const isInactive = data.is_deactivated;

	const initials = getAvatarFallback(data.name);

	return (
		<Card
			className={cn(
				"relative p-4 rounded-none transition",
				isInactive && "opacity-60 grayscale",
			)}
		>
			<div className="absolute right-2 top-2">
				<UserRowActions row={data} />
			</div>

			<div className="grid grid-cols-[auto_1fr] gap-4">
				<Avatar className="h-14 w-14">
					<AvatarImage src={data.avatar_url} alt={data.name} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>

				<div className="min-w-0 space-y-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h3 className="font-semibold truncate">{data.name}</h3>

						<Badge className={ROLE_COLORS[data.role]}>
							{ROLE_LABEL[data.role]}
						</Badge>

						{isInactive && <Badge variant="outline">Inativo</Badge>}
					</div>

					<p className="text-sm text-muted-foreground truncate">
						{data.email}
					</p>

					<p className="text-xs text-muted-foreground">
						@{data.username}
					</p>

					{data.bio && (
						<p className="text-sm text-muted-foreground line-clamp-2 pt-1">
							{data.bio}
						</p>
					)}
				</div>
			</div>
		</Card>
	);
}
