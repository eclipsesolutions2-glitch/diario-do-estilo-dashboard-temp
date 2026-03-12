import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { NotFoundEntities } from "@/components/layout/not-found-entity";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Subscriber } from "@/core/contracts/newsletter";
import { columns } from "./columns";

interface TableListNewsletterSubscriberProps {
	data: Subscriber[];
}

export function TableListNewsletterSubscribers({
	data,
}: TableListNewsletterSubscriberProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const visibleRows = table.getRowModel().rows;
	const emptyLabel = "Nenhum subscritor encontrado";

	return (
		<div>
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

			<div className="flex flex-wrap gap-3 items-center justify-between py-4 text-sm text-muted-foreground">
				<span>
					Total de {visibleRows.length.toString().padStart(2, "0")}{" "}
					subscritores encontrados
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
