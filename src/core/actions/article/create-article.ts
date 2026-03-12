import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticleFn } from "./utils";

export const useCreateArticles = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
