import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/layout/form-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateArticles } from "@/core/actions/article/create-article";
import {
	type CreateArticleSchemaValues,
	createArticleSchema,
} from "@/core/schemas/articles/create.schema";
import { formatSlug } from "@/lib/formats/format-slug";

export function CreateArticleForm() {
	const { mutateAsync: createArticle } = useCreateArticles();

	const form = useForm<CreateArticleSchemaValues>({
		mode: "all",
		resolver: zodResolver(createArticleSchema),
		defaultValues: {
			title: "",
			content: "",
			excerpt: "",
			slug: "",
			is_featured: false,
			is_published: false,
			cover_image: null,
			gallery_images: null,
		},
	});

	const { control, handleSubmit, formState, reset, watch, setValue } = form;

	const title = watch("title");
	const content = watch("content");

	useEffect(() => {
		setValue("slug", title ? formatSlug(title) : "", {
			shouldValidate: true,
		});
	}, [title, setValue]);

	const onSubmit = handleSubmit(async (values) => {
		await createArticle(values, {
			onSuccess() {
				toast.success("Artigo criado com sucesso.");
				reset();
				redirect({
					href: "/articles",
					replace: true,
				});
			},
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<FieldSet className="gap-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Informações do Artigo */}
					<FieldGroup className="gap-4">
						<p className="hidden lg:block text-sm font-medium">
							Informações do Artigo
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								name="title"
								label="Título"
								control={control}
								required
							>
								{({ ...field }) => (
									<Input
										placeholder="Ex: Como usar React Query"
										className="rounded-none"
										{...field}
									/>
								)}
							</FormField>

							<FormField
								name="slug"
								label="Slug"
								control={control}
								required
							>
								{({ ...field }) => (
									<Input
										placeholder="titulo-do-artigo"
										className="rounded-none"
										disabled
										{...field}
									/>
								)}
							</FormField>
						</div>

						<FormField
							name="excerpt"
							label="Resumo"
							control={control}
							required
						>
							{({ ...field }) => (
								<Textarea
									rows={3}
									placeholder="Breve descrição do artigo"
									className="rounded-none min-h-32"
									{...field}
								/>
							)}
						</FormField>

						<FormField
							name="content"
							label="Conteúdo"
							control={control}
							required
							header={
								<div className="flex items-center justify-end gap-3">
									<Badge
										variant="outline"
										className="rounded-none"
									>
										{content.length} caracteres
									</Badge>
									<Badge
										variant="outline"
										className="rounded-none"
									>
										{
											content
												.trim()
												.split(/\s+/)
												.filter(Boolean).length
										}{" "}
										palavras
									</Badge>
								</div>
							}
						>
							{({ ...field }) => (
								<Textarea
									rows={8}
									placeholder="Escreva o conteúdo do artigo..."
									className="rounded-none min-h-44"
									{...field}
								/>
							)}
						</FormField>
					</FieldGroup>

					{/* Configurações */}
					<FieldGroup className="gap-4">
						<p className="hidden lg:block text-sm font-medium">
							Configurações
						</p>

						<FormField
							name="cover_image"
							label="Imagem de capa"
							control={control}
						>
							{({ onChange }) => (
								<Input
									type="file"
									accept="image/*"
									className="rounded-none"
									onChange={(e) =>
										onChange(e.target.files?.[0] ?? null)
									}
								/>
							)}
						</FormField>

						<div className="flex items-center gap-4">
							<FormField
								name="is_published"
								label="Publicar artigo"
								control={control}
							>
								{({ value, onChange }) => (
									<Switch
										checked={value}
										onCheckedChange={onChange}
									/>
								)}
							</FormField>

							<FormField
								name="is_featured"
								label="Destacar artigo"
								control={control}
							>
								{({ value, onChange }) => (
									<Switch
										checked={value}
										onCheckedChange={onChange}
									/>
								)}
							</FormField>
						</div>
					</FieldGroup>
				</div>

				<Field orientation="horizontal" className="justify-end">
					<Button variant="outline" type="button">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={formState.isSubmitting}
						className="rounded-none text-xs uppercase tracking-wider font-medium gap-2"
					>
						{formState.isSubmitting ? (
							<>
								<Spinner />
								Criando artigo...
							</>
						) : (
							<>
								<ArrowDown />
								Criar artigo
							</>
						)}
					</Button>
				</Field>
			</FieldSet>
		</form>
	);
}
