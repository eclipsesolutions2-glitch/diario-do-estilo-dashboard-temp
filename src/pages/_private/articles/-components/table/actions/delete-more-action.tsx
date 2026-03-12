"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import { useDeleteArticle } from "@/core/actions/article/delete-article";

interface DeleteMoreActionProps {
	slug: string;
}

export function DeleteMoreAction({ slug }: DeleteMoreActionProps) {
	const [showModal, setShowModal] = useState(false);
	const { mutateAsync } = useDeleteArticle();

	const handleDelete = async () =>
		await mutateAsync(slug, {
			onSuccess() {
				toast.success("Categoria eliminada com sucesso.");
				setShowModal(false);
			},
			onError() {
				toast.error("Falha na tentativa de eliminação categoria.");
			},
		});

	return (
		<AlertDialog open={showModal} onOpenChange={setShowModal}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					className="rounded-none"
				>
					<Trash2 className="h-4 w-4" />
					<span>Eliminar</span>
				</DropdownMenuItem>
			</AlertDialogTrigger>

			<AlertDialogContent className="rounded-none">
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmar eliminação</AlertDialogTitle>

					<AlertDialogDescription>
						Esta ação é permanente. O artigo será removido junto com
						todos os dados associados.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-none">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="rounded-none"
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
