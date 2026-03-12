"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/layout/form-field";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateArticle } from "@/core/actions/article/update-article";
import type { Article } from "@/core/contracts/articles";
import {
	type UpdateArticleSchemaValues,
	updateArticleSchema,
} from "@/core/schemas/articles/update.schema";
import { formatSlug } from "@/lib/formats/format-slug";

interface UpdateArticleFormProps {
	defaultValues: Article;
	onFinishSubmit?: () => void;
}

export function UpdateArticleForm({
	defaultValues,
	onFinishSubmit,
}: UpdateArticleFormProps) {
	const { mutateAsync: onUpdateArticle } = useUpdateArticle();

	const form = useForm({
		mode: "all",
		resolver: zodResolver(updateArticleSchema),
		defaultValues: {
			title: defaultValues.title || "",
			content: defaultValues.content || "",
			excerpt: defaultValues.excerpt || "",
			slug: defaultValues.slug || "",
			is_featured: defaultValues.is_featured || false,
			is_published: defaultValues.is_published || false,
			cover_image: null,
			gallery_images: null,
		},
	});

	const { control, handleSubmit, setValue, formState } = form;
	const title = form.watch("title");

	useEffect(() => {
		if (!title) return;
		setValue("slug", formatSlug(title), { shouldValidate: true });
	}, [title, setValue]);

	const onSubmit = async (values: UpdateArticleSchemaValues) =>
		await onUpdateArticle(
			{
				title: values.title,
				old_slug: defaultValues.slug,
				slug: values.slug,
				excerpt: values.excerpt,
				content: values.content,
				is_featured: values.is_featured,
				is_published: values.is_published,
				cover_image:
					typeof values.cover_image !== "undefined"
						? values.cover_image
						: null,
				gallery_images: values.gallery_images,
			},
			{
				onSuccess() {
					toast.success("Artigo actulizado com sucesso.");
					onFinishSubmit?.();
					form.reset();
				},
			},
		);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldSet className="gap-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<FieldGroup className="gap-4">
						<p className="text-sm font-medium text-foreground hidden lg:block">
							Informações do Artigo
						</p>

						<FormField
							name="title"
							label="Título"
							control={control}
						>
							{(field) => (
								<Input
									placeholder="Ex: Como usar React Query"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField name="slug" label="Slug" control={control}>
							{(field) => (
								<Input
									placeholder="como-usar-react-query"
									disabled
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField
							name="excerpt"
							label="Resumo"
							control={control}
						>
							{(field) => (
								<Textarea
									rows={3}
									placeholder="Breve descrição do artigo"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField
							name="content"
							label="Conteúdo"
							control={control}
						>
							{(field) => (
								<Textarea
									rows={8}
									placeholder="Escreva o conteúdo do artigo..."
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>
					</FieldGroup>

					<FieldGroup className="gap-4">
						<p className="text-sm font-medium text-foreground hidden lg:block">
							Configurações
						</p>

						<FormField
							name="cover_image"
							label="Imagem de capa"
							control={control}
						>
							{(field) => (
								<Input
									type="file"
									accept="image/*"
									className="rounded-none"
									onChange={(e) => {
										const file = e.target.files?.[0];
										field.onChange(file || null);
									}}
								/>
							)}
						</FormField>

						<FormField
							name="is_published"
							label="Publicar artigo"
							control={control}
						>
							{(field) => (
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						</FormField>

						<FormField
							name="is_featured"
							label="Destacar artigo"
							control={control}
						>
							{(field) => (
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						</FormField>
					</FieldGroup>
				</div>

				<Button
					type="submit"
					disabled={formState.isSubmitting}
					className="w-full rounded-none text-xs uppercase tracking-wider font-medium"
				>
					{formState.isSubmitting ? (
						<>
							<Spinner />
							<span>Actualizando artigo...</span>
						</>
					) : (
						"Actualizar artigo"
					)}
				</Button>
			</FieldSet>
		</form>
	);
}
