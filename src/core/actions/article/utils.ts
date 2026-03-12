import type { CreateArticleSchemaValues } from "@/core/schemas/articles/create.schema";
import type { UpdateArticleSchemaValues } from "@/core/schemas/articles/update.schema";
import { axios } from "@/lib/axios";

export const findManyArticleFn = async () => {
	return await axios("/admin/articles");
};

export const findOneArticleFn = async (slug: string) => {
	return await axios(`/admin/articles/${slug}`);
};

export const createArticleFn = async (data: CreateArticleSchemaValues) => {
	const formData = new FormData();
	formData.set("title", data.title);
	formData.set("slug", data.slug);
	formData.set("excerpt", `${data.excerpt}`);
	formData.set("content", data.content);

	formData.set("is_published", `${data.is_published}`);
	formData.set("is_featured", `${data.is_featured}`);

	if (data.cover_image) {
		formData.append("cover_image", data.cover_image);
	}

	if (data.gallery_images?.length) {
		data.gallery_images.forEach((file) => {
			formData.append("gallery_images[]", file);
		});
	}

	return await axios.post("/admin/articles", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const updateArticleFn = async (
	data: UpdateArticleSchemaValues & { old_slug: string },
) => {
	const formData = new FormData();
	formData.set("title", data.title);
	formData.set("slug", data.slug);
	formData.set("excerpt", `${data.excerpt}`);
	formData.set("content", data.content);

	formData.set("is_published", `${data.is_published}`);
	formData.set("is_featured", `${data.is_featured}`);

	if (data.cover_image) {
		formData.append("cover_image", data.cover_image);
	}

	if (data.gallery_images?.length) {
		data.gallery_images.forEach((file) => {
			formData.append("gallery_images[]", file);
		});
	}

	return await axios.put(`/admin/articles/${data.old_slug}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const deleteArticleFn = async (slug: string) => {
	return await axios.delete(`/admin/article/${slug}`);
};

export const restoreArticleFn = async (slug: string) => {
	return await axios.post(`/admin/article/${slug}/restore`);
};

// newsletter connection
export const publishInNewsletterArticleFn = async (slug: string) => {
	return await axios.post("/admin/newsletter/send-article", { slug });
};

// category connection
export const desynchronizeArticleWithCategoryFn = async ({
	slug,
	categoryId,
}: {
	slug: string;
	categoryId: number;
}) => {
	return await axios.delete(`/admin/articles/${slug}/categories`, {
		data: {
			category_id: categoryId,
		},
	});
};

export const synchronizeArticleWithCategoryFn = async ({
	slug,
	categoryId,
}: {
	slug: string;
	categoryId: number;
}) => {
	return await axios.post(`/admin/articles/${slug}/categories`, {
		category_id: categoryId,
	});
};
