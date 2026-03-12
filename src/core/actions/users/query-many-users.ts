import { useQuery } from "@tanstack/react-query";
import { findManyUsersFn } from "./utils";

export const useQueryUsers = () => {
	const query = useQuery({
		queryKey: ["list-users"],
		queryFn: findManyUsersFn,
	});
	return { ...query, data: query.data?.data };
};
