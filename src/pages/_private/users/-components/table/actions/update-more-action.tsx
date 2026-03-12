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
import type { User } from "@/core/contracts/users";
import { UpdateUserForm } from "../../forms/update-user-form";

interface UpdateMoreActionProps {
	data: User;
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
					<DialogTitle>Detalhes do usuário</DialogTitle>
					<DialogDescription>
						Veja abaixo as updatermações registradas para este
						usuário.
					</DialogDescription>
				</DialogHeader>

				<UpdateUserForm
					defaultValues={data}
					onFinishSubmit={() => setShowModal(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
