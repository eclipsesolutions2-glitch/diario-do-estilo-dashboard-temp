import { MoreActions } from "@/components/layout/more";
import type { Category } from "@/core/contracts/categories";
import { DeleteMoreAction } from "./delete-more-action";
import { UpdateMoreAction } from "./update-more-action";

export function CategoryRowActions({ row }: { row: Category }) {
	return (
		<MoreActions>
			<UpdateMoreAction data={row} />
			<DeleteMoreAction slug={row.slug} />
		</MoreActions>
	);
}
