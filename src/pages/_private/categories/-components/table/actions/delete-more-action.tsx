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
import { useDeleteCategory } from "@/core/actions/category/delete-category";

interface DeleteMoreActionProps {
	slug: string;
}

export function DeleteMoreAction({ slug }: DeleteMoreActionProps) {
	const [showModal, setShowModal] = useState(false);
	const { mutateAsync } = useDeleteCategory();

	const handleDelete = async () =>
		await mutateAsync(slug, {
			onSuccess() {
				toast.success("Categoria eliminada com sucesso.");
				setShowModal(false);
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
					<AlertDialogTitle>
						Tem certeza que deseja eliminar esta categoria?
					</AlertDialogTitle>

					<AlertDialogDescription>
						Esta ação não pode ser desfeita. A categoria será
						removida permanentemente e todos os dados associados
						serão eliminados.
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
