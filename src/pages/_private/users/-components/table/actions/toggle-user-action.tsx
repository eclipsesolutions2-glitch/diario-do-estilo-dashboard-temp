"use client";

import { RotateCcw, UserRoundX } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToggleUserStatus } from "@/core/actions/users/toggle-user-status";

interface ToggleUserActionProps {
	id: number;
	variant: "disable" | "restore";
}

const CONFIG = {
	disable: {
		icon: UserRoundX,
		trigger: "Desativar",
		title: "Tem certeza que deseja desativar este usuário?",
		description:
			"O usuário perderá acesso ao sistema. Esta ação pode ser desfeita reativando o usuário posteriormente.",
		confirm: "Desativar",
	},
	restore: {
		icon: RotateCcw,
		trigger: "Reativar",
		title: "Tem certeza que deseja reativar este usuário?",
		description: "O usuário voltará a ter acesso ao sistema.",
		confirm: "Reativar",
	},
} as const;

export function ToggleUserAction({ id, variant }: ToggleUserActionProps) {
	const { mutateAsync } = useToggleUserStatus();
	const {
		icon: Icon,
		trigger,
		title,
		description,
		confirm,
	} = CONFIG[variant];

	const handleConfirm = () =>
		mutateAsync({
			action: variant === "disable" ? "inactive" : "restore",
			userId: id,
		});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					className="rounded-none"
				>
					<Icon className="h-4 w-4" />
					<span>{trigger}</span>
				</DropdownMenuItem>
			</AlertDialogTrigger>

			<AlertDialogContent className="rounded-none">
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-none">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						className="rounded-none"
					>
						{confirm}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
