import { createFileRoute } from "@tanstack/react-router";
import { TopPageContent } from "@/components/layout/top-page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryOverview } from "@/core/actions/overview/query-overview";
import { SkeletonTable } from "../newsletters/-components/tables/skeleton-table";
import { ArticlesByCategoryChart } from "./-components/charts/articles-by-category-chart";
import { ArticlesPerDayChart } from "./-components/charts/articles-per-day-chart";
import { StatusDistributionChart } from "./-components/charts/status-distribution-chart";
import { OverviewStats } from "./-components/overview-stats";
import { TableListRecentArticles } from "./-components/recent-article-table";

export const Route = createFileRoute("/_private/_overview/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isPending } = useQueryOverview();
	return (
		<div className="space-y-4">
			<TopPageContent
				title="Bem-vindo/a ao Dashboard"
				description="Gerencie seu conteúdo de moda africana e mantenha sua plataforma atualizada"
			/>

			{isPending ? (
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="min-h-8 w-2/6 rounded-none" />
						<Skeleton className="min-h-8 w-2/5 rounded-none" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						<Skeleton className="min-h-32 rounded-none" />
						<Skeleton className="min-h-32 rounded-none" />
						<Skeleton className="min-h-32 rounded-none" />
						<Skeleton className="min-h-32 rounded-none" />
					</div>

					<div className="flex items-center gap-4">
						<Skeleton className="min-h-52" />
						<Skeleton className="min-h-52" />
					</div>
				</div>
			) : (
				data && <OverviewStats data={data?.summary} />
			)}

			{isPending ? (
				<div>...</div>
			) : (
				data && (
					<ArticlesByCategoryChart
						data={data.charts.articles_by_category}
					/>
				)
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{isPending ? (
					<div>...</div>
				) : (
					data && (
						<>
							<ArticlesPerDayChart
								labels={data.charts.articles_per_day.labels}
								created={data.charts.articles_per_day.created}
								read={data.charts.articles_per_day.read}
							/>
							<StatusDistributionChart
								data={data.charts.status_distribution}
							/>
						</>
					)
				)}
			</div>

			{isPending ? (
				<SkeletonTable />
			) : (
				data && (
					<section className="space-y-4">
						<h3 className="text-xl font-bold">Artigos Recentes</h3>
						<TableListRecentArticles data={data.recent_articles} />
					</section>
				)
			)}
		</div>
	);
}
