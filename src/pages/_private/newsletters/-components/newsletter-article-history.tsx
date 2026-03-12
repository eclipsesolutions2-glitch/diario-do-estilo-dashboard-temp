import { useQueryArticlesNewsLetter } from "@/core/actions/newsletter/query-articles-newsletter";
import { TableListHistoryArticle } from "./tables/history-article";
import { SkeletonTable } from "./tables/skeleton-table";

export function NewsletterArticleHistory() {
	const { data, isPending } = useQueryArticlesNewsLetter();

	if (isPending) {
		return <SkeletonTable />;
	}
	return (
		<section className="space-y-4">
			<h3 className="text-xl font-bold">
				Histórico de artigo na Newsletter
			</h3>

			<TableListHistoryArticle data={data.data} />
		</section>
	);
}
