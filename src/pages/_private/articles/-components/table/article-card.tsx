import { CheckCircle, Eye, FileEdit, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Article } from "@/core/contracts/articles";
import { cn } from "@/lib/utils";
import { ArticleRowActions } from "./actions/article-row-actions";

interface ArticleCardProps {
	data: Article;
}

export function ArticleCard({ data }: ArticleCardProps) {
	return (
		<Card className="overflow-hidden relative rounded-none p-0 transition-all border">
			<div className="relative w-full h-44 md:h-56 lg:h-64 xl:h-72 2xl:h-80">
				<img
					src={data.cover_image}
					alt={data.title}
					className="object-cover"
				/>
			</div>
			<div className="absolute right-4 top-4">
				<ArticleRowActions row={data} />
			</div>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between gap-4">
					<div className="flex gap-2">
						{data.is_featured && (
							<Badge
								variant="secondary"
								className={cn(
									"flex items-center gap-1",
									data.is_featured
										? "bg-violet-500/20 text-violet-800 rounded-none"
										: "bg-muted text-muted-foreground rounded-none",
								)}
							>
								<Star size={14} /> Destaque
							</Badge>
						)}

						<Badge
							variant="default"
							className={cn(
								"flex items-center gap-1",
								data.is_published
									? "bg-green-500/15 text-green-700 rounded-none"
									: "bg-yellow-500/15 text-yellow-700 rounded-none",
							)}
						>
							{data.is_published ? (
								<CheckCircle size={14} />
							) : (
								<FileEdit size={14} />
							)}
							{data.is_published ? "Publicado" : "Rascunho"}
						</Badge>
					</div>
					<div className="flex items-center text-sm text-muted-foreground dark:text-muted gap-1 mt-2">
						<Eye size={16} />
						{data.view_count.toLocaleString()} visualizações
					</div>
				</div>
				<div className="flex items-start justify-between gap-2">
					<h2 className="text-xl font-semibold">{data.title}</h2>
				</div>

				<p className="text-sm text-neutral-400 line-clamp-2">
					{data.excerpt}
				</p>
			</CardHeader>

			<CardContent className="pt-0 pb-6 space-y-2">
				<div className="flex items-center gap-2 flex-wrap">
					{data.categories.map((category) => (
						<Badge
							key={category}
							variant="secondary"
							className="rounded-none"
						>
							{category}
						</Badge>
					))}
				</div>
				<div className="flex justify-between text-xs text-muted-foreground dark:text-muted">
					<div>
						Autor:{" "}
						<span className="text-muted-foreground dark:text-muted">
							{data.author?.name}
						</span>
					</div>

					{data.published_at && (
						<div>
							{new Date(data.published_at).toLocaleDateString()}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
