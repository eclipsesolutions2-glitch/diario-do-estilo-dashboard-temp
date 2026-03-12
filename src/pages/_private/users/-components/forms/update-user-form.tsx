"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateUser } from "@/core/actions/users/update-user";
import {
	type UpdateUserSchemaValues,
	updateUserSchema,
} from "@/core/schemas/users/update-user.schema";

interface UpdateUserFormProps {
	defaultValues: UpdateUserSchemaValues & { id: number };
	onFinishSubmit?: () => void;
}

export function UpdateUserForm({
	defaultValues,
	onFinishSubmit,
}: UpdateUserFormProps) {
	const { mutateAsync: onUpdateUser } = useUpdateUser();
	const [advanced, setAdvanced] = useState(false);
	const form = useForm({
		mode: "all",
		criteriaMode: "firstError",
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			name: defaultValues.name,
			username: defaultValues.username,
			email: defaultValues.email,
			role: defaultValues.role,
			password: defaultValues.password,
			passwordConfirmation: defaultValues.passwordConfirmation,
		},
	});

	const name = useWatch({ control: form.control, name: "name" });

	useEffect(() => {
		if (!name) {
			form.setValue("username", "");
			return;
		}

		const username = name
			.trim()
			.toLowerCase()
			.replace(/\s+/g, "-")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");

		form.setValue("username", username);
	}, [name, form]);

	const onSubmit = async (formData: UpdateUserSchemaValues) =>
		await onUpdateUser(
			{
				...formData,
				id: defaultValues.id,
			},
			{
				onSuccess() {
					toast.success("Usuário atualizado com sucesso.");
					onFinishSubmit?.();
					form.reset();
				},
			},
		);

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
			<FieldSet>
				<FieldGroup>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor="name">
										Nome completo
									</FieldLabel>
									<div className="text-sm text-muted-foreground">
										Username:{" "}
										<span className="font-medium">
											{"@"}
											{form.watch("username") ||
												"joao-da-silva"}
										</span>
									</div>
								</div>
								<Input
									type="text"
									id="name"
									placeholder="Ex: João da Silva"
									autoComplete="name"
									className="rounded-none"
									{...field}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="email">E-mail</FieldLabel>
								<Input
									type="email"
									id="email"
									placeholder="exemplo@dominio.com"
									autoComplete="email"
									className="rounded-none"
									{...field}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="role"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="role">
									Permissão
								</FieldLabel>
								<Select
									value={field.value}
									onValueChange={(value) =>
										field.onChange(
											value as UpdateUserSchemaValues["role"],
										)
									}
								>
									<SelectTrigger
										id="role"
										className="rounded-none"
									>
										<SelectValue placeholder="Selecione a permissão" />
									</SelectTrigger>
									<SelectContent className="rounded-none">
										<SelectItem value="admin">
											Administrador
										</SelectItem>
										<SelectItem value="editor">
											Editor
										</SelectItem>
										<SelectItem value="reader">
											Leitor
										</SelectItem>
									</SelectContent>
								</Select>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<div className="space-y-2">
						<Button
							variant="ghost"
							type="button"
							className="flex items-center justify-between cursor-pointer select-none hover:bg-transparent"
							onClick={() => setAdvanced((prev) => !prev)}
						>
							<span className="font-medium">
								Opções Avançadas
							</span>
							{advanced ? (
								<ChevronUp size={16} />
							) : (
								<ChevronDown size={16} />
							)}
						</Button>

						{advanced && (
							<>
								<Controller
									name="password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="password">
												Nova Senha
											</FieldLabel>
											<Input
												id="password"
												type="password"
												placeholder="Mínimo de 8 caracteres"
												className="rounded-none"
												{...field}
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>

								<Controller
									name="passwordConfirmation"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="passwordConfirmation">
												Confirmar nova senha
											</FieldLabel>
											<Input
												id="passwordConfirmation"
												type="password"
												placeholder="Repita sua senha"
												className="rounded-none"
												{...field}
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</>
						)}
					</div>
				</FieldGroup>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full rounded-none"
				>
					{form.formState.isSubmitting ? (
						<div className="flex items-center gap-2">
							<Spinner />
							<span>Atualizando usuário...</span>
						</div>
					) : (
						"Atualizar usiuário"
					)}
				</Button>
			</FieldSet>
		</form>
	);
}
