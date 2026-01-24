import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import React from "react";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "../ui/empty";

interface Column<T> {
	header: React.ReactNode;
	className?: string;
	render: (item: T, index: number) => React.ReactNode;
}

interface BaseTableProps<T> {
	data: T[];
	columns: Column<T>[];
	loading?: boolean;
	search?: string;
	skeletonRows?: number;
	emptyTitle?: string;
	emptyDescription?: string;

	checkedPool?: {
		getId: (row: T) => string;
		value: string[];
		onChange: (next: string[]) => void;
	};
}

export function BaseTable<T>({
	data,
	columns,
	loading = false,
	search,
	skeletonRows = 3,
	emptyTitle = "Data tidak tersedia",
	emptyDescription = "Belum ada data yang bisa ditampilkan",

	checkedPool,
}: BaseTableProps<T>) {
	const isEmpty = !loading && data.length === 0;
	const isSearching = Boolean(search?.trim());

	return (
		<Table className="w-full border border-[#C8C8C8]">
			<TableHeader className="bg-[#F6FfF5]">
				<TableRow>
					{checkedPool && (
						<TableHead className="w-[50px] text-center">
							<input
								type="checkbox"
								checked={
									data.length > 0 &&
									data.every((row) =>
										checkedPool.value.includes(checkedPool.getId(row)),
									)
								}
								onChange={(e) => {
									if (e.target.checked) {
										checkedPool.onChange(
											data.map((row) => checkedPool.getId(row)),
										);
									} else {
										checkedPool.onChange([]);
									}
								}}
							/>
						</TableHead>
					)}

					{columns.map((col, idx) => (
						<TableHead key={idx} className={col.className}>
							{col.header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{/* 🔄 LOADING */}
				{loading &&
					Array.from({ length: skeletonRows }).map((_, rowIdx) => (
						<TableRow key={`skeleton-${rowIdx}`}>
							{checkedPool && (
								<TableCell>
									<Skeleton className="h-4 w-4" />
								</TableCell>
							)}

							{columns.map((_, colIdx) => (
								<TableCell key={colIdx}>
									<Skeleton className="h-4 w-full" />
								</TableCell>
							))}
						</TableRow>
					))}

				{/* 📭 EMPTY */}
				{isEmpty && (
					<TableRow>
						<TableCell
							colSpan={checkedPool ? columns.length + 1 : columns.length}
							className="p-0"
						>
							<Empty className="border-0 rounded-none">
								<EmptyHeader>
									<EmptyTitle>
										{isSearching ? "Data tidak ditemukan" : emptyTitle}
									</EmptyTitle>
									<EmptyDescription>
										{isSearching
											? `Pencarian "${search}" tidak menemukan hasil`
											: emptyDescription}
									</EmptyDescription>
								</EmptyHeader>
							</Empty>
						</TableCell>
					</TableRow>
				)}

				{/* 📄 DATA */}
				{!loading &&
					data.map((item, idx) => {
						const id = checkedPool?.getId(item);
						const checked = id ? checkedPool?.value.includes(id) : false;

						return (
							<TableRow key={idx}>
								{checkedPool && (
									<TableCell className="text-center">
										<input
											type="checkbox"
											checked={checked}
											onChange={(e) => {
												if (!id) return;

												if (e.target.checked) {
													checkedPool.onChange([...checkedPool.value, id]);
												} else {
													checkedPool.onChange(
														checkedPool.value.filter((v) => v !== id),
													);
												}
											}}
										/>
									</TableCell>
								)}

								{columns.map((col, colIdx) => (
									<TableCell
										key={colIdx}
										className="whitespace-normal break-words"
									>
										{col.render(item, idx)}
									</TableCell>
								))}
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
}
