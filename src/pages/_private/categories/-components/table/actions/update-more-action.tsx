"use client";
import { Edit } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Category } from "@/core/contracts/categories";
import { UpdateCategoryForm } from "../../forms/update-category";

interface UpdateMoreActionProps {
	data: Category;
}

export function UpdateMoreAction({ data }: UpdateMoreActionProps) {
	const [showModal, setShowModal] = useState(false);
	return (
		<Dialog open={showModal} onOpenChange={setShowModal}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					className="rounded-none"
				>
					<Edit className="h-4 w-4" />
					<span>Actualizar</span>
				</DropdownMenuItem>
			</DialogTrigger>

			<DialogContent className="rounded-none">
				<DialogHeader className="rounded-none">
					<DialogTitle>Atualizar categoria</DialogTitle>
					<DialogDescription>
						Edite as informações da categoria e clique em Guardar
						para salvar as alterações.
					</DialogDescription>
				</DialogHeader>

				<UpdateCategoryForm
					defaultValues={data}
					onFinishSubmit={() => setShowModal(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
