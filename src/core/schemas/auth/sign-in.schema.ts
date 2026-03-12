import { z } from "zod";

export const signInSchema = z.object({
	email: z.email({ message: "Informe um email válido" }),
	password: z.string().min(8, { message: "Deve ter no minimo 8 caracteres" }),
});

export type SignInSchemaValues = z.infer<typeof signInSchema>;
