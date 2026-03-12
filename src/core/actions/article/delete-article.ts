import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticleFn } from "./utils";

export const useDeleteArticle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
