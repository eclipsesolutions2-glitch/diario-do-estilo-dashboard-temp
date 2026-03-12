import { MoreActions } from "@/components/layout/more";
import type { Article } from "@/core/contracts/articles";
import { CategorySelector } from "./article-category-selector";
import { DeleteMoreAction } from "./delete-more-action";
import { DetailsMoreAction } from "./details-more-action";
import { PublishedInNewsletterMoreAction } from "./published-in-newsletter";
import { UpdateMoreAction } from "./update-more-action";

export function ArticleRowActions({ row }: { row: Article }) {
	return (
		<MoreActions>
			<UpdateMoreAction data={row} />
			<DeleteMoreAction slug={row.slug} />
			<DetailsMoreAction slug={row.slug} />

			<MoreActions.Separator />
			<CategorySelector
				articleSlug={row.slug}
				categories={row.categories}
			/>
			<PublishedInNewsletterMoreAction
				slug={row.slug}
				in_newsletter={row.is_in_newsletter}
			/>
		</MoreActions>
	);
}
