import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoriesFn } from "./utils";

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCategoriesFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-categories"],
			});
		},
	});
};
