import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
} from "@/components/ui/empty";
import React from "react";

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
}

export function BaseTable<T>({
	data,
	columns,
	loading = false,
	search,
	skeletonRows = 3,
	emptyTitle = "Data tidak tersedia",
	emptyDescription = "Belum ada data yang bisa ditampilkan",
}: BaseTableProps<T>) {
	const isEmpty = !loading && data.length === 0;
	const isSearching = Boolean(search?.trim());

	return (
		<Table className="w-full md:table-fixed overflow-auto border border-[#C8C8C8]">
			<TableHeader className="bg-[#F6FFF5]">
				<TableRow>
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
						<TableCell colSpan={columns.length} className="p-0">
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
					data.map((item, idx) => (
						<TableRow key={idx}>
							{columns.map((col, colIdx) => (
								<TableCell
									key={colIdx}
									className="whitespace-normal break-words"
								>
									{col.render(item, idx)}
								</TableCell>
							))}
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
