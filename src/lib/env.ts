import { z } from "zod";

const urlOrEmpty = z
	.string()
	.transform((value) => value.trim())
	.refine((value) => value === "" || /^https?:\/\//.test(value), {
		message: "Invalid URL format",
	});

const envSchema = z.object({
	VITE_PUBLIC_API_URL: urlOrEmpty.default("http://localhost:3000"),
});

export const env = envSchema.parse(import.meta.env);
