import { createFileRoute, redirect } from "@tanstack/react-router";
import { Calendar, Eye, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQueryOneArticle } from "@/core/actions/article/query-one-articles";
import { formatDateFull } from "@/lib/formats/format-date";
import { ArticleRenderContent } from "./-components/article-render-content";

export const Route = createFileRoute("/_private/articles/$slug")({
	component: RouteComponent,
});

function RouteComponent() {
	const a = Route.useParams();
	const { data: article, isPending } = useQueryOneArticle(a.slug);

	if (isPending) {
		return <div>...</div>;
	}

	if (!article) {
		return redirect({ to: "/articles" });
	}

	return (
		<main className="p-4">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-8 lg:grid-cols-[420px_1fr]">
					<aside className="space-y-6">
						<div className="relative aspect-square overflow-hidden rounded-none bg-muted shadow-sm">
							<img
								src={article.cover_image || ""}
								alt={article.title}
								className="object-cover"
							/>
						</div>
						<div className="flex items-center justify-between rounded-none border bg-background p-4">
							<div className="flex items-center gap-2 text-sm">
								<User2 className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium">
									{article.author?.name}
								</span>
							</div>

							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar className="h-4 w-4" />
								{formatDateFull(article.published_at ?? "")}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="rounded-none border p-4">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Eye className="h-4 w-4" />
									Visualizações
								</div>
								<p className="mt-1 text-lg font-semibold">
									{article.view_count}
								</p>
							</div>

							{/* <div className="rounded-none border p-4">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<ThumbsUp className="h-4 w-4" />
									Likes
								</div>
								<p className="mt-1 text-lg font-semibold">
									{article.view_count}
								</p>
							</div> */}
						</div>
					</aside>
					<section className="space-y-6">
						<div className="flex items-center gap-3">
							<Badge
								variant="outline"
								className={
									article.is_published
										? "bg-green-500/15 text-green-700 rounded-none"
										: "bg-yellow-500/15 text-yellow-700 rounded-none"
								}
							>
								{article.is_published
									? "Publicado"
									: "Rascunho"}
							</Badge>
							<Badge
								variant="outline"
								className={
									article.is_featured
										? "bg-violet-500/20 text-violet-800 rounded-none"
										: "bg-muted/10 text-muted-foreground rounded-none"
								}
							>
								{article.is_featured
									? "Destaque"
									: "Não destaque"}
							</Badge>
						</div>

						<h1 className="text-3xl font-bold leading-tight tracking-tight">
							{article.title}
						</h1>

						{article.categories.length > 0 && (
							<div className="rounded-none py-4">
								<div className="mb-3 flex items-center gap-2">
									<h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
										Categorias
									</h3>
									<span className="text-xs font-medium text-primary">
										{`(${String(article.categories.length).padStart(2, "0")})`}
									</span>
								</div>
							</div>
						)}

						<div className="flex flex-wrap gap-2">
							{article.categories.map((tag: string) => (
								<Badge
									key={tag}
									variant="outline"
									className="text-xs rounded-none"
								>
									{tag}
								</Badge>
							))}
						</div>

						<ArticleRenderContent content={article.content} />
					</section>
				</div>
			</div>
		</main>
	);
}
