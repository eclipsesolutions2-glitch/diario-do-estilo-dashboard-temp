import { z } from "zod";

export const registerUserSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
		username: z.string().min(3, {
			message: "Nome do usuário deve ter no mínimo 3 caracteres",
		}),
		email: z.email({ message: "Informe um email válido" }),
		password: z
			.string()
			.min(8, { message: "Deve ter no mínimo 8 caracteres" }),
		passwordConfirmation: z
			.string()
			.min(8, { message: "Deve ter no mínimo 8 caracteres" }),
		role: z.enum(["reader", "admin", "editor"]).default("reader"),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "As senhas devem ser iguais",
		path: ["passwordConfirmation"],
	});

export type RegisterUserSchemaValues = z.infer<typeof registerUserSchema>;
