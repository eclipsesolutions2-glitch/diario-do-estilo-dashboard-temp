import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { TopPageContent } from "@/components/layout/top-page-content";
import { useQueryManyCategories } from "@/core/actions/category/query-many-categories";
import { TableListCategories } from "./-components/table";

export const Route = createFileRoute("/_private/categories/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isPending } = useQueryManyCategories();
	return (
		<div>
			<TopPageContent
				title="Categorias"
				description="Crie, edite e organize as categorias dos seus artigos"
			/>

			{isPending ? (
				<LoadingScreen />
			) : (
				<TableListCategories data={data} />
			)}
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</div>
	);
}
