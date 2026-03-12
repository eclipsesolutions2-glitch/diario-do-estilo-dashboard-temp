import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishInNewsletterArticleFn } from "./utils";

export const usePublishInNewsletterArticle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: publishInNewsletterArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
