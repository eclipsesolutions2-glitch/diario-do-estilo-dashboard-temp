import { useQuery } from "@tanstack/react-query";
import { findSubscribersNewsletterFn } from "./utils";

export const useQuerySubscribers = () => {
	const query = useQuery({
		queryKey: ["list-subscribers"],
		queryFn: findSubscribersNewsletterFn,
	});
	return { ...query, data: query.data?.data };
};
