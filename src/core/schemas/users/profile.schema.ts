import z from "zod";

export const updateProfileSchema = z.object({
	name: z
		.string()
		.min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
	email: z.string().email({ message: "Informe um e-mail válido." }),
	username: z.string().min(3, {
		message: "O nome de usuário deve ter no mínimo 3 caracteres.",
	}),
	bio: z
		.string()
		.trim()
		.transform((val) => (val === "" ? undefined : val))
		.optional()
		.refine((val) => !val || val.length >= 3, {
			message: "A bio deve ter no mínimo 3 caracteres.",
		})
		.refine((val) => !val || val.length <= 125, {
			message: "A bio deve ter no máximo 125 caracteres.",
		}),
});

export type UpdateProfileSchemaValues = z.infer<typeof updateProfileSchema>;
