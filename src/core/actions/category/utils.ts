import type { Category } from "@/core/contracts/categories";
import type { CreateCategorySchemaValues } from "@/core/schemas/categories/create.schema";
import type { UpdateCategorySchemaValues } from "@/core/schemas/categories/update.schema";
import { axios } from "@/lib/axios";
import type { AxiosPromise } from "axios";

export const findMayCategoriesFn = async (): AxiosPromise<Category[]> => {
	return await axios("/admin/categories");
};

export const createCategoriesFn = async (data: CreateCategorySchemaValues) => {
	return await axios.post("/admin/categories", data);
};

export const updateCategoriesFn = async (
	data: UpdateCategorySchemaValues & { slug: string },
) => {
	return await axios.put(`/admin/categories/${data.slug}`, {
		name: data.name,
		description: data.description,
	});
};

export const deleteCategoriesFn = async (slug: string) => {
	return await axios.delete(`/admin/categories/${slug}`);
};
