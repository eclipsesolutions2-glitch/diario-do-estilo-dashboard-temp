import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/layout/form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/core/actions/category/create-category";
import {
	type CreateCategorySchemaValues,
	createCategorySchema,
} from "@/core/schemas/categories/create.schema";

interface CreateCategoryFormProps {
	onFinishSubmit?: () => void;
}

export function CreateCategoryForm({
	onFinishSubmit,
}: CreateCategoryFormProps) {
	const { mutateAsync } = useCreateCategory();
	const form = useForm<CreateCategorySchemaValues>({
		mode: "all",
		criteriaMode: "firstError",
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onSubmit = async (data: CreateCategorySchemaValues) =>
		await mutateAsync(
			{
				name: data.name,
				description: data.description,
			},
			{
				onSuccess() {
					toast.success("Categoria criada com sucesso");
					form.reset();
					if (onFinishSubmit) onFinishSubmit();
				},
			},
		);

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<FieldSet className="gap-6">
				<FieldGroup className="gap-6">
					<FormField
						name="name"
						label="Designação"
						control={form.control}
					>
						{(field) => (
							<Input
								id="name"
								placeholder="Nome da categoria"
								className="rounded-none"
								{...(field as object)}
							/>
						)}
					</FormField>
				</FieldGroup>

				<FieldGroup className="gap-6">
					<FormField
						name="description"
						label="Descrição"
						control={form.control}
					>
						{(field) => (
							<Textarea
								className="min-h-32 resize-none rounded-none"
								placeholder="Descreva brevemente a categoria..."
								{...(field as object)}
							/>
						)}
					</FormField>
				</FieldGroup>
				<DialogFooter className="gap-2">
					<DialogClose asChild>
						<Button variant="outline" className="rounded-none">
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="rounded-none"
					>
						{form.formState.isSubmitting ? (
							<div className="flex items-center gap-2">
								<Spinner />
								<span>Cadastrando categoria...</span>
							</div>
						) : (
							"Criar Categoria"
						)}
					</Button>
				</DialogFooter>
			</FieldSet>
		</form>
	);
}
