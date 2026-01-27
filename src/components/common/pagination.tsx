import { cn } from "@/utils/cn";
import { useSearchParams } from "react-router-dom";

export type MetaPagination = {
	total: number;
	last_page: number;
	page: number;
	limit: number;
	total_diajukan?: number;
	total_dibatalkan?: number;
	total_disetujui?: number;
	total_ditolak?: number;
	total_draft?: number;
	hadir?: number;
	sakit?: number;
	izin?: number;
	cuti?: number;
	alpha?: number;
	perjalanan_dinas?: number;
	diajukan: number;
	disetujui: number;
	ditolak: number;
};

interface PaginationProps {
	pageKey?: string;
	meta?: MetaPagination;
}

export function Pagination({ pageKey = "page", meta }: PaginationProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	if (!meta || meta.last_page < 1) return null;

	const currentPage = Number(searchParams.get(pageKey) ?? 1);
	const lastPage = meta.last_page;

	const { start, end } = getPaginationRange(currentPage, lastPage, 5);

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set(pageKey, page.toString());
		setSearchParams(params, { replace: true });
	};

	const startIndex = (currentPage - 1) * meta.limit + 1;
	const endIndex = Math.min(currentPage * meta.limit, meta.total);

	return (
		<div className="flex items-center justify-center md:justify-between text-sm">
			<p className="hidden md:block text-sm text-[#888]">
				Menampilkan {startIndex} - {endIndex} dari {meta.total} data
			</p>

			<div className="flex items-center gap-1">
				{/* First */}
				{start > 1 && (
					<>
						<PageButton onClick={() => goToPage(1)}>1</PageButton>
						<span className="px-2">…</span>
					</>
				)}

				{/* Pages */}
				{Array.from({ length: end - start + 1 }).map((_, idx) => {
					const page = start + idx;
					return (
						<PageButton
							key={page}
							active={page === currentPage}
							onClick={() => goToPage(page)}
						>
							{page}
						</PageButton>
					);
				})}

				{/* Last */}
				{end < lastPage && (
					<>
						<span className="px-2">…</span>
						<PageButton onClick={() => goToPage(lastPage)}>
							{lastPage}
						</PageButton>
					</>
				)}
			</div>
		</div>
	);
}

/* ---------- Helpers ---------- */

function PageButton({
	children,
	active,
	onClick,
}: {
	children: React.ReactNode;
	active?: boolean;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"min-w-[32px] rounded-md border px-2 py-1 transition",
				active
					? "bg-[#1E5916] text-white border-[#1E5916]"
					: "bg-white hover:bg-[#F5F5FF]",
			)}
		>
			{children}
		</button>
	);
}

function getPaginationRange(
	currentPage: number,
	lastPage: number,
	maxVisible = 5,
) {
	const half = Math.floor(maxVisible / 2);

	let start = Math.max(1, currentPage - half);
	let end = start + maxVisible - 1;

	if (end > lastPage) {
		end = lastPage;
		start = Math.max(1, end - maxVisible + 1);
	}

	return { start, end };
}
