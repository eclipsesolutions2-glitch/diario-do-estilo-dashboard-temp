import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoriesFn } from "./utils";

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCategoriesFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-categories"],
			});
		},
	});
};
