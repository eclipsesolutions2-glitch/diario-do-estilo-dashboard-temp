import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { useSignIn } from "@/core/actions/auth/sign-in.action";
import {
	type SignInSchemaValues,
	signInSchema,
} from "@/core/schemas/auth/sign-in.schema";

export function SignInForm() {
	const { data: user, mutateAsync } = useSignIn();
	const form = useForm({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (formData: SignInSchemaValues) => {
		await mutateAsync({
			email: formData.email,
			password: formData.password,
		});
	};
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldSet>
				<FieldGroup>
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="exemplo@email.com"
									autoComplete="email"
									aria-autocomplete="list"
									aria-invalid={!!form.formState.errors.email}
									{...field}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="password"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor="password">
										Senha
									</FieldLabel>
									{/*<Link
									href="/forgot"
									className="text-sm text-primary hover:text-brand-700 hover:underline"
									as="/forgot"
								>
									Esqueceu a senha?
								</Link>*/}
								</div>
								<Input
									id="password"
									type="password"
									placeholder="********"
									aria-invalid={
										!!form.formState.errors.password
									}
									{...field}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="w-full rounded-none text-xs uppercase tracking-wider font-medium"
				>
					{form.formState.isSubmitting ? (
						<div className="flex items-center">
							<Spinner className="mr-2 inline-block" />
							<span>Entrando...</span>
						</div>
					) : (
						"Entrar"
					)}
				</Button>
			</FieldSet>
		</form>
	);
}
