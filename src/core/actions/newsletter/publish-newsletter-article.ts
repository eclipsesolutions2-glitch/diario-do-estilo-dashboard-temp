import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishNewsletterArticleFn } from "./utils";

export const usePublishNewsletterArticle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: publishNewsletterArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles-newsletter", "subscriber-state"],
			});
		},
	});
};
