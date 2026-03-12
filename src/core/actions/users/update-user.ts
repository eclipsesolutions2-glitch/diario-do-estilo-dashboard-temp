import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFn } from "./utils";

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUserFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-users"],
			});
		},
	});
};
