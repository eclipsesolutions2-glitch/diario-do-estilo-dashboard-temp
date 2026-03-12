import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { NotFoundEntities } from "@/components/layout/not-found-entity";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Category } from "@/core/contracts/categories";
import { CreateCategoryForm } from "../forms/create-category";
import { CategoryCard } from "./category-card";
import { columns } from "./columns";

interface TableListCategoriesProps {
	data: Category[];
}

export function TableListCategories({ data }: TableListCategoriesProps) {
	const [showModal, setShowModal] = useState(false);

	const [search, setSearch] = useQueryState("search", {
		defaultValue: "",
		clearOnDefault: true,
	});

	const [pageQuery, setPageQuery] = useQueryState(
		"page",
		parseAsInteger.withDefault(1),
	);

	const pageSize = 10;
	const pageIndex = pageQuery - 1;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		globalFilterFn: "includesString",
		onGlobalFilterChange: setSearch,
		onPaginationChange: (updater) => {
			const next =
				typeof updater === "function"
					? updater({ pageIndex, pageSize })
					: updater;
			setPageQuery(Math.max(0, next.pageIndex) + 1);
		},
		state: {
			globalFilter: search,
			pagination: { pageIndex, pageSize },
		},
	});

	const filteredRows = table.getFilteredRowModel().rows;
	const visibleRows = table.getRowModel().rows;
	const emptyLabel = "Nenhuma categoria encontrado";

	return (
		<div className="w-full">
			<div className="flex items-center justify-between gap-4 py-4">
				<Input
					placeholder="Pesquisar categoria..."
					value={search}
					onChange={({ target }) => setSearch(target.value)}
					className="max-w-sm rounded-none"
				/>

				<Dialog open={showModal} onOpenChange={setShowModal}>
					<DialogTrigger asChild>
						<Button>
							<Plus />
							<span>Nova categoria</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="rounded-none w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl ">
						<DialogHeader>
							<DialogTitle>Criar Novo categoria</DialogTitle>
							<DialogDescription>
								Preencha os detalhes abaixo para adicionar uma
								nova categoria ao sistema.
							</DialogDescription>
						</DialogHeader>
						<CreateCategoryForm
							onFinishSubmit={() => setShowModal(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="border overflow-hidden max-md:hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((group) => (
							<TableRow
								key={group.id}
								className="hover:bg-transparent"
							>
								{group.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{visibleRows.length ? (
							visibleRows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<NotFoundEntities label={emptyLabel} />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="grid sm:grid-cols-2 gap-4 items-stretch md:hidden">
				{visibleRows.length ? (
					visibleRows.map((row) => (
						<CategoryCard data={row.original} key={row.index} />
					))
				) : (
					<NotFoundEntities
						label={emptyLabel}
						className="sm:col-span-2 min-h-80 select-none"
					/>
				)}
			</div>

			<div className="flex flex-wrap gap-3 items-center justify-between py-4 text-sm text-muted-foreground">
				<span>
					Total de {filteredRows.length.toString().padStart(2, "0")}{" "}
					categorias encontradas
				</span>
				<div className="space-x-2">
					{(
						[
							{
								label: "Anterior",
								action: () => table.previousPage(),
								disabled: !table.getCanPreviousPage(),
							},
							{
								label: "Próximo",
								action: () => table.nextPage(),
								disabled: !table.getCanNextPage(),
							},
						] as const
					).map(({ label, action, disabled }) => (
						<Button
							key={label}
							variant="outline"
							size="sm"
							className="rounded-none"
							onClick={action}
							disabled={disabled}
						>
							{label}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
