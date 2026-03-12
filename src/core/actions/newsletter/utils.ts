import { axios } from "@/lib/axios";

export const findSubscribersNewsletterFn = async () => {
	return await axios("/admin/newsletter/subscribers");
};

export const findSubscribersStatsNewsletterFn = async () => {
	return await axios("/admin/newsletter/subscribers/stats");
};

export const getNewsletterArticleHistoryFn = async (perPage: number = 20) => {
	return await axios(`/admin/newsletter/sent-articles?per_page=${perPage}`);
};

export const publishNewsletterArticleFn = async (slug: string) => {
	return await axios.post("/admin/newsletter/send-article", { slug });
};
