"use client";

import { Calendar, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Category } from "@/core/contracts/categories";
import { cn } from "@/lib/utils";
import { CategoryRowActions } from "./actions/category-row-actions";

interface CategoryCardProps {
	data: Category;
}

export function CategoryCard({ data }: CategoryCardProps) {
	return (
		<Card className={cn("relative p-4 rounded-none transition")}>
			<div className="absolute right-2 top-2">
				<CategoryRowActions row={data} />
			</div>

			<div className="grid grid-cols-[auto_1fr] gap-4">
				<div className="flex items-center justify-center h-14 w-14 bg-muted">
					<Tag className="h-6 w-6 text-muted-foreground" />
				</div>

				<div className="min-w-0 space-y-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h3 className="font-semibold truncate">{data.name}</h3>

						<Badge variant="outline">{data.slug}</Badge>
					</div>

					{data.description && (
						<p className="text-sm text-muted-foreground line-clamp-2">
							{data.description}
						</p>
					)}

					<div className="pt-1 space-y-1 text-xs text-muted-foreground">
						<div className="flex items-center gap-2">
							<User className="h-3.5 w-3.5" />
							<span>{data.created_by?.name}</span>
						</div>

						<div className="flex items-center gap-2">
							<Calendar className="h-3.5 w-3.5" />
							<span>
								{new Date(data.created_at).toLocaleDateString()}
							</span>
						</div>

						<div className="flex items-center gap-2">
							<Calendar className="h-3.5 w-3.5" />
							<span>
								{new Date(data.updated_at).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
