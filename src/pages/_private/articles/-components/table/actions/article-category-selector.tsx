import { Check, Tags, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSynchronizedArticleWithCategory } from "@/core/actions/article/toggle-synchronized-article-with-category";
import { useQueryManyCategories } from "@/core/actions/category/query-many-categories";
import type { Category } from "@/core/contracts/categories";

type CategorySelectorProps = {
	articleSlug: string;
	categories: string[];
};

export function CategorySelector({
	articleSlug,
	categories: defaultCategories,
}: CategorySelectorProps) {
	const [open, setOpen] = useState(false);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const { data: allCategories = [] } = useQueryManyCategories();
	const { mutateAsync: syncCategory } = useSynchronizedArticleWithCategory();

	useEffect(() => {
		if (!allCategories.length) return;

		setSelectedIds(
			allCategories
				.filter((c) => defaultCategories.includes(c.name))
				.map((c) => c.id),
		);
	}, [allCategories, defaultCategories]);

	const selectedSet = new Set(selectedIds);

	const handleToggleCategory = async (categoryId: number) => {
		const isSelected = selectedSet.has(categoryId);

		await syncCategory({
			action: isSelected ? "resync" : "sync",
			slug: articleSlug,
			categoryId,
		});

		setSelectedIds((prev) =>
			isSelected
				? prev.filter((id) => id !== categoryId)
				: [...prev, categoryId],
		);
	};

	const selectedCategories = allCategories.filter((c) =>
		selectedSet.has(c.id),
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<Tags className="h-4 w-4" />
					<span>Categorias</span>

					{selectedIds.length > 0 && (
						<Badge
							variant="secondary"
							className="ml-auto rounded-none"
						>
							{selectedIds.length}
						</Badge>
					)}
				</DropdownMenuItem>
			</DialogTrigger>

			<DialogContent className="max-w-md rounded-none">
				<DialogHeader>
					<DialogTitle>Gerenciar Categorias</DialogTitle>
					<DialogDescription>
						Selecione as categorias para este artigo
					</DialogDescription>
				</DialogHeader>

				{selectedCategories.length > 0 && (
					<div className="flex flex-wrap gap-2 border-b py-2">
						{selectedCategories.map((category) => (
							<Badge
								key={category.id}
								variant="secondary"
								className="gap-1 pr-1 rounded-none"
							>
								{category.name}

								<Button
									variant="ghost"
									size="icon-sm"
									className="ml-1 p-0 rounded-none"
									onClick={() =>
										handleToggleCategory(category.id)
									}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}
					</div>
				)}

				<Command className="border-0 rounded-none">
					<CommandInput
						placeholder="Pesquisar categorias..."
						className="rounded-none"
					/>

					<CommandList>
						<CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
							Nenhuma categoria encontrada.
						</CommandEmpty>

						<CommandGroup>
							{allCategories.map((category: Category) => {
								const isSelected = selectedSet.has(category.id);

								return (
									<CommandItem
										key={category.id}
										onSelect={() =>
											handleToggleCategory(category.id)
										}
										className="flex justify-between cursor-pointer rounded-none"
									>
										<span
											className={
												isSelected
													? "font-medium"
													: "text-muted-foreground"
											}
										>
											{category.name}
										</span>

										{isSelected && (
											<Check className="h-4 w-4 text-primary" />
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
