import { useQuery } from "@tanstack/react-query";
import { findOneArticleFn } from "./utils";

export const useQueryOneArticle = (slug?: string) => {
	const query = useQuery({
		queryKey: ["article", slug],
		queryFn: () => findOneArticleFn(slug as string),
		enabled: !!slug,
	});

	return {
		...query,
		data: query.data?.data,
	};
};
