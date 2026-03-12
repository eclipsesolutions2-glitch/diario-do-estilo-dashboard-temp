import { useQuery } from "@tanstack/react-query";
import { getNewsletterArticleHistoryFn } from "./utils";

export const useQueryArticlesNewsLetter = (perPage = 10) => {
	const query = useQuery({
		queryKey: ["list-articles-newsletter", perPage],
		queryFn: () => getNewsletterArticleHistoryFn(perPage),
	});

	return { ...query, data: query.data?.data };
};
