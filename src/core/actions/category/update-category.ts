import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoriesFn } from "./utils";

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCategoriesFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-categories"],
			});
		},
	});
};
