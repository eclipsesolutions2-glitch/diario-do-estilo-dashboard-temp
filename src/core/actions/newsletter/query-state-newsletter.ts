import { useQuery } from "@tanstack/react-query";
import { findSubscribersStatsNewsletterFn } from "./utils";

export const useQuerySubscriberState = () => {
	const query = useQuery({
		queryKey: ["subscriber-state"],
		queryFn: findSubscribersStatsNewsletterFn,
	});
	return { ...query, data: query.data?.data };
};
