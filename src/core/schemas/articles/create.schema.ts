import { z } from "zod";
import { formatSlug } from "@/lib/formats/format-slug";

export const createArticleSchema = z.object({
	title: z
		.string()
		.min(50, "O título deve ter no mínimo 50 caracteres")
		.max(60, "O título deve ter no máximo 60 caracteres"),
	slug: z
		.string()
		.min(3, "O slug deve ter no mínimo 3 caracteres")
		.max(75, "O slug deve ter no máximo 75 caracteres")
		.refine((field) => field === formatSlug(field), {
			message:
				"O slug deve conter apenas letras minúsculas, números e hífens",
		}),
	excerpt: z
		.string()
		.min(120, "O resumo deve ter no mínimo 120 caracteres")
		.optional(),
	content: z
		.string()
		.min(300, "O conteúdo deve ter no mínimo 300 caracteres"),

	is_published: z.boolean(),
	is_featured: z.boolean(),

	cover_image: z.instanceof(File).nullable().optional(),

	gallery_images: z.array(z.instanceof(File)).nullable().optional(),
});

export type CreateArticleSchemaValues = z.infer<typeof createArticleSchema>;
