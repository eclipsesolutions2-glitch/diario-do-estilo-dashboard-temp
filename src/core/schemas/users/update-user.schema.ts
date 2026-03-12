import { z } from "zod";

export const updateUserSchema = z
	.object({
		name: z
			.string()
			.min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
			.optional(),

		username: z
			.string()
			.min(3, { message: "Username deve ter no mínimo 3 caracteres" })
			.optional(),

		email: z
			.string()
			.email({ message: "Informe um email válido" })
			.optional(),
		password: z
			.string()
			.min(8, { message: "Deve ter no mínimo 8 caracteres" })
			.optional(),
		passwordConfirmation: z
			.string()
			.min(8, { message: "Deve ter no mínimo 8 caracteres" })
			.optional(),

		role: z.enum(["reader", "admin", "editor"]).optional(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "As senhas devem ser iguais",
		path: ["passwordConfirmation"],
	});

export type UpdateUserSchemaValues = z.infer<typeof updateUserSchema>;
