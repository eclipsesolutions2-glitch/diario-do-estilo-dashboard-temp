import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { TopPageContent } from "@/components/layout/top-page-content";
import { useQueryManyArticles } from "@/core/actions/article/query-many-articles";
import { TableListArticle } from "./-components/table";

export const Route = createFileRoute("/_private/articles/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isPending } = useQueryManyArticles();
	return (
		<div>
			<TopPageContent
				title="Artigos"
				description="Gerencie todo o conteúdo do seu blog"
			/>

			{isPending ? (
				<LoadingScreen />
			) : (
				<TableListArticle data={data.data} />
			)}
		</div>
	);
}
