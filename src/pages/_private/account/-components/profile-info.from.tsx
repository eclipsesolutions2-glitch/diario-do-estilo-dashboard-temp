"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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
import { Spinner } from "@/components/ui/spinner";
import { useUpdateProfileUser } from "@/core/actions/users/update-profile-user";
import {
	type UpdateProfileSchemaValues,
	updateProfileSchema,
} from "@/core/schemas/users/profile.schema";

interface ProfileInfoFormProps {
	defaultValues: UpdateProfileSchemaValues;
}

export function ProfileInfoForm({ defaultValues }: ProfileInfoFormProps) {
	const { mutateAsync: onUpdateProfile } = useUpdateProfileUser();
	const form = useForm<UpdateProfileSchemaValues>({
		mode: "all",
		resolver: zodResolver(updateProfileSchema),
		defaultValues,
	});

	const onSubmit = async (data: UpdateProfileSchemaValues) => {
		await onUpdateProfile(
			{
				name: data.name,
				email: data.email,
				username: data.username,
				bio: data.bio,
			},
			{
				onSuccess() {
					toast.success("Perfil actualizado com sucesso.");
					form.reset(data);
				},
			},
		);
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<FieldSet>
				<FieldGroup>
					<div className="grid md:grid-cols-2 gap-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Nome completo</FieldLabel>
									<Input
										type="text"
										placeholder="Ex: João da Silva"
										autoComplete="name"
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
							name="bio"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Bio</FieldLabel>

									<Input
										type="text"
										placeholder="Fale um pouco sobre você..."
										maxLength={125}
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
							name="username"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Nome de usuário</FieldLabel>

									<Input
										type="text"
										placeholder="Ex: joaosilva"
										autoComplete="username"
										disabled
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
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>E-mail</FieldLabel>

									<Input
										type="email"
										placeholder="exemplo@dominio.com"
										autoComplete="email"
										disabled
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
					</div>

					<p className="text-xs tracking-wide text-muted-foreground font-bold">
						Nota: Email não pode ser alterado
					</p>

					<div className="flex items-center gap-3">
						<Button
							type="submit"
							disabled={
								!form.formState.isDirty ||
								form.formState.isSubmitting
							}
							className="text-white rounded-none"
						>
							{form.formState.isSubmitting ? (
								<div className="flex items-center gap-2">
									<Spinner />
									<span>Salvando...</span>
								</div>
							) : (
								<>
									<Save className="h-4 w-4" />
									Salvar Alterações
								</>
							)}
						</Button>

						<Button
							type="button"
							variant="outline"
							size="icon"
							title="Restaurar dados originais"
							disabled={!form.formState.isDirty}
							onClick={() => form.reset(defaultValues)}
							className="rounded-none"
						>
							<RefreshCcw />
						</Button>
					</div>
				</FieldGroup>
			</FieldSet>
		</form>
	);
}
