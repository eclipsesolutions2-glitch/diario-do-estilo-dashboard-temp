import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { FormField } from "@/components/layout/form-field";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useCreateUser } from "@/core/actions/users/create-user";
import {
	type RegisterUserSchemaValues,
	registerUserSchema,
} from "@/core/schemas/users/register-user.schema";

interface CreateUserFormProps {
	onFinishSubmit?: () => void;
}

export function CreateUserForm({ onFinishSubmit }: CreateUserFormProps) {
	const { mutateAsync: onCreateUser } = useCreateUser();

	const form = useForm({
		mode: "all",
		resolver: zodResolver(registerUserSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			role: "editor",
			password: "",
			passwordConfirmation: "",
		},
	});

	const { control, handleSubmit, setValue, formState } = form;

	const name = useWatch({ control, name: "name" });
	const username = useWatch({ control, name: "username" });

	useEffect(() => {
		if (!name) {
			setValue("username", "");
			return;
		}
		setValue(
			"username",
			name
				.trim()
				.toLowerCase()
				.replace(/\s+/g, "-")
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, ""),
		);
	}, [name, setValue]);

	const onSubmit = async (formData: RegisterUserSchemaValues) =>
		await onCreateUser(formData, {
			onSuccess() {
				toast.success("Usuário criado com sucesso.");
				onFinishSubmit?.();
				form.reset();
			},
		});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldSet className="gap-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<FieldGroup className="gap-4">
						<p className="text-sm font-medium text-foreground hidden sm:block">
							Dados pessoais
						</p>

						<FormField
							name="name"
							label="Nome completo"
							control={control}
							header={
								<span className="text-sm text-muted-foreground">
									Username:{" "}
									<span className="font-medium">
										@{username || "joao-da-silva"}
									</span>
								</span>
							}
						>
							{(field) => (
								<Input
									id="name"
									type="text"
									placeholder="Ex: João da Silva"
									autoComplete="name"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField
							name="email"
							label="E-mail"
							control={control}
						>
							{(field) => (
								<Input
									id="email"
									type="email"
									placeholder="exemplo@dominio.com"
									autoComplete="email"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField
							name="role"
							label="Permissão"
							control={control}
						>
							{(field) => {
								const f = field as {
									value: string;
									onChange: (v: string) => void;
								};
								return (
									<Select
										value={f.value}
										onValueChange={(value) =>
											f.onChange(
												value as RegisterUserSchemaValues["role"],
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
										</SelectContent>
									</Select>
								);
							}}
						</FormField>
					</FieldGroup>

					<FieldGroup className="gap-4">
						<div className="space-y-0.5 hidden sm:block">
							<p className="text-sm font-medium text-foreground ">
								Senha
							</p>
							<p className="text-xs text-muted-foreground">
								Mínimo de 8 caracteres, com letras e números.
							</p>
						</div>

						<FormField
							name="password"
							label="Nova senha"
							control={control}
						>
							{(field) => (
								<Input
									id="password"
									type="password"
									placeholder="Mínimo de 8 caracteres"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>

						<FormField
							name="passwordConfirmation"
							label="Confirmar nova senha"
							control={control}
						>
							{(field) => (
								<Input
									id="passwordConfirmation"
									type="password"
									placeholder="Repita sua senha"
									className="rounded-none"
									{...(field as object)}
								/>
							)}
						</FormField>
					</FieldGroup>
				</div>

				<Button
					type="submit"
					disabled={formState.isSubmitting}
					className="w-full rounded-none"
				>
					{formState.isSubmitting ? (
						<>
							<Spinner />
							<span>Criando usuário...</span>
						</>
					) : (
						"Criar usuário"
					)}
				</Button>
			</FieldSet>
		</form>
	);
}
