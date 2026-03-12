import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileUserFn } from "./utils";

export const useUpdateProfileUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateProfileUserFn,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["session-user"],
			});
		},
	});
};
