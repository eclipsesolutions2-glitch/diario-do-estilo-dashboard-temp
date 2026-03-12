import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreArticleFn } from "./utils";

export const useRestoreArticle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: restoreArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
