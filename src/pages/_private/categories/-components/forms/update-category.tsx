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
import { useUpdateCategory } from "@/core/actions/category/update-category";
import type { Category } from "@/core/contracts/categories";
import { createCategorySchema } from "@/core/schemas/categories/create.schema";
import type { UpdateCategorySchemaValues } from "@/core/schemas/categories/update.schema";

interface UpdateCategoryFormProps {
	defaultValues: Category;
	onFinishSubmit?: () => void;
}

export function UpdateCategoryForm({
	onFinishSubmit,
	defaultValues,
}: UpdateCategoryFormProps) {
	const { mutateAsync } = useUpdateCategory();
	const form = useForm<UpdateCategorySchemaValues>({
		mode: "all",
		criteriaMode: "firstError",
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: defaultValues.name ?? "",
			description: defaultValues.description ?? "",
		},
	});

	const onSubmit = async (data: UpdateCategorySchemaValues) =>
		await mutateAsync(
			{
				name: data.name,
				description: data.description,
				slug: defaultValues.slug,
			},
			{
				onSuccess() {
					toast.success("Categoria actualizada com sucesso");
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
								<span>Guardando Alterações...</span>
							</div>
						) : (
							"Guardar Alterações"
						)}
					</Button>
				</DialogFooter>
			</FieldSet>
		</form>
	);
}
