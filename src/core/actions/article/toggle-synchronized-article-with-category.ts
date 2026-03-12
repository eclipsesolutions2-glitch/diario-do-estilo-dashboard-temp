import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	desynchronizeArticleWithCategoryFn,
	synchronizeArticleWithCategoryFn,
} from "./utils";

interface Params {
	slug: string;
	categoryId: number;
	action: "sync" | "resync";
}

export const useSynchronizedArticleWithCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ slug, categoryId, action }: Params) =>
			action === "sync"
				? synchronizeArticleWithCategoryFn({ slug, categoryId })
				: desynchronizeArticleWithCategoryFn({ slug, categoryId }),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["list-articles"],
			});
		},
	});
};
