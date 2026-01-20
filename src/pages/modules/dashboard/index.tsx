import { useSearchParams } from "react-router-dom";
import { useGetModul } from "./controller";
import { SearchInput } from "@/components/common/searchInput";
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { FaImage } from "react-icons/fa";

export default function DashboardPage() {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("search-modul");

	const paramsDefault = {
		search: search || "",
	};

	const { data, loading } = useGetModul(paramsDefault);

	return (
		<div className="flex flex-col gap-4">
			<SearchInput pageKey="page-modul" searchKey="search-modul" />

			{/* LOADING STATE */}
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{Array.from({ length: 8 }).map((_, idx) => (
						<ModulCardSkeleton key={idx} />
					))}
				</div>
			)}

			{/* EMPTY STATE */}
			{!loading && data?.length === 0 && (
				<Empty className="border border-dashed">
					<EmptyHeader>
						<EmptyTitle>Modul tidak ditemukan</EmptyTitle>
						<EmptyDescription>
							Coba ubah kata kunci pencarian atau tambahkan modul baru.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}

			{/* DATA STATE */}
			{!loading && data && data.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{data.map((item, idx) => (
						<div
							key={idx}
							className="min-h-48 flex-col relative hover:text-[#1E5916] text-[#444444] flex items-center justify-center gap-2 rounded-lg border border-[#DFDFDF] hover:border-[#9EDAA0] hover:bg-[#F6FFF5] duration-300 transition-colors cursor-pointer"
						>
							{item?.photo ? (
								<img src={item?.photo} alt={item?.nama} className="w-16 h-16" />
							) : (
								<FaImage size={64} color="#021a00" />
							)}
							<p className="font-medium">{item?.nama}</p>

							<div className="absolute top-0 right-0 text-xs flex items-center gap-1 m-3">
								{item?.berlangganan ? (
									<>
										<div className="w-3 h-3 bg-rose-500 rounded-full" />
										<p>Tidak Aktif</p>
									</>
								) : (
									<>
										<div className="w-3 h-3 bg-emerald-500 rounded-full" />
										<p>Aktif</p>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function ModulCardSkeleton() {
	return (
		<div className="min-h-48 flex flex-col items-center justify-center gap-3 rounded-lg border border-[#DFDFDF] p-4">
			<Skeleton className="w-16 h-16 rounded-full" />
			<Skeleton className="h-4 w-24" />
			<div className="absolute top-0 right-0 m-3">
				<Skeleton className="h-3 w-16" />
			</div>
		</div>
	);
}
