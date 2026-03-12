import { useQuery } from "@tanstack/react-query";
import { findManyArticleFn } from "./utils";

export const useQueryManyArticles = () => {
	const query = useQuery({
		queryKey: ["list-articles"],
		queryFn: findManyArticleFn,
	});
	return { ...query, data: query.data?.data };
};
