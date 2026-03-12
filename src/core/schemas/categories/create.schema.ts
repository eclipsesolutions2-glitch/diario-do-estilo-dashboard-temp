import { z } from "zod";

export const createCategorySchema = z.object({
	name: z
		.string()
		.min(1, "Nome é obrigatório")
		.max(100, "Nome deve ter no máximo 100 caracteres"),
	description: z
		.string()
		.max(500, "Descrição deve ter no máximo 500 caracteres")
		.optional(),
});

export type CreateCategorySchemaValues = z.infer<typeof createCategorySchema>;
