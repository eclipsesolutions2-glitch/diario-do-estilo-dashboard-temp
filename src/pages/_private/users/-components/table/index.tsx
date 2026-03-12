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
import type { User } from "@/core/contracts/users";
import { CreateUserForm } from "../forms/create-user-form";
import { columns } from "./columns";
import { UserCard } from "./user-card";

interface TableListUserProps {
	data: User[];
}

export function TableListUser({ data }: TableListUserProps) {
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
	const emptyLabel = "Nenhum usuário encontrado";

	return (
		<div className="w-full">
			<div className="flex items-center justify-between gap-4 py-4">
				<Input
					placeholder="Pesquisar usuário..."
					value={search}
					onChange={({ target }) => setSearch(target.value)}
					className="max-w-sm rounded-none"
				/>

				<Dialog open={showModal} onOpenChange={setShowModal}>
					<DialogTrigger asChild>
						<Button>
							<Plus />
							<span>Novo usuário</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="rounded-none w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl lg:max-w-4xl">
						<DialogHeader>
							<DialogTitle>Criar Novo Usuário</DialogTitle>
							<DialogDescription>
								Preencha os detalhes abaixo para adicionar um
								novo usuário ao sistema.
							</DialogDescription>
						</DialogHeader>
						<CreateUserForm
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
						<UserCard key={row.id} data={row.original} />
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
					usuários encontrados
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
