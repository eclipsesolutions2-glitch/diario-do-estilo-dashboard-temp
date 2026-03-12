import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticleFn } from "./utils";

export const useUpdateArticle = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateArticleFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
