import { useQuery } from "@tanstack/react-query";
import { findMayCategoriesFn } from "./utils";

export const useQueryManyCategories = () => {
	const query = useQuery({
		queryKey: ["list-categories"],
		queryFn: findMayCategoriesFn,
	});
	return { ...query, data: query.data?.data };
};
