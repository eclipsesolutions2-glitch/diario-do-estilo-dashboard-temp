import { useQuery } from "@tanstack/react-query";
import { overviewStatsFn } from "./utils";

export const useQueryOverview = () => {
	const query = useQuery({
		queryKey: ["overview-state"],
		queryFn: overviewStatsFn,
	});
	return { ...query, data: query.data };
};
