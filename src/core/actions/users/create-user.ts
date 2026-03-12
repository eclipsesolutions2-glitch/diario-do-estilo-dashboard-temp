import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserFn } from "./utils";

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUserFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-users"],
			});
		},
	});
};
