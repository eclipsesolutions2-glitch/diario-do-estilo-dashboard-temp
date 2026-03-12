import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inactiveUserFn, restoreUserFn } from "./utils";

type Action = "restore" | "inactive";

type Params = {
	userId: number;
	action: Action;
};

export const useToggleUserStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ userId, action }: Params) =>
			action === "restore"
				? restoreUserFn(userId)
				: inactiveUserFn(userId),

		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-users"],
			});
		},
	});
};
