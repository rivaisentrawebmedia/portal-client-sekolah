import { useNavigate, useSearchParams } from "react-router-dom";
import type { GetMadingParams } from "../../model";
import { useGetMading } from "../../controller";
import { JokoSpiralCalendar } from "@/assets/icons/JokoSpiralCalendar";
import { JokoManTechnology } from "@/assets/icons/JokoManTechnology";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { FaNewspaper } from "react-icons/fa";

export function DashboardMadingTerpopuler() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-mading-terpopuler");
	const limit = searchParams.get("limit-mading-terpopuler");
	const search = searchParams.get("search-mading-terpopuler");

	const paramsDefault: GetMadingParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: undefined,
	};

	const { data, loading } = useGetMading(paramsDefault);

	return (
		<div className="flex flex-col gap-2 bg-[#F5F9FF] rounded-md p-3 border border-[#70A6F2]">
			<p className="text-[#276CCD] font-medium">Mading Terpopuler</p>

			{/* ===== LOADING SKELETON ===== */}
			{loading &&
				Array.from({ length: 5 }).map((_, idx) => (
					<div key={idx} className="flex gap-2 animate-pulse">
						{/* Thumbnail */}
						<div className="w-30 h-30 bg-slate-300 rounded-md shrink-0" />

						{/* Content */}
						<div className="flex flex-col flex-1 gap-2">
							<div className="h-4 bg-slate-300 rounded w-full" />
							<div className="h-4 bg-slate-300 rounded w-4/5" />
							<div className="flex flex-col gap-1 mt-1">
								<div className="h-3 bg-slate-300 rounded w-32" />
								<div className="h-3 bg-slate-300 rounded w-24" />
							</div>
						</div>
					</div>
				))}

			{!loading && data?.length === 0 && (
				<Empty className="bg-white border border-dashed">
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<FaNewspaper />
						</EmptyMedia>
						<EmptyTitle>Belum Ada Mading</EmptyTitle>
						<EmptyDescription>
							Belum ada Mading yang dipublikasikan saat ini.
						</EmptyDescription>
					</EmptyHeader>

					<EmptyContent>
						<p>Mading terbaru akan muncul di sini setelah dipublikasikan.</p>
					</EmptyContent>
				</Empty>
			)}

			{/* ===== DATA ===== */}
			{!loading &&
				data?.slice(0, 5)?.map((item, idx) => (
					<div
						key={idx}
						className="flex gap-2 group cursor-pointer"
						onClick={() => {
							navigate(
								`/admin/website/mading/${item?.id}/detail?${searchParams.toString()}`,
							);
						}}
					>
						<div className="relative overflow-hidden">
							{item?.gambar?.[0] ? (
								<img
									src={item?.gambar?.[0]?.id}
									className="w-30 h-30 object-cover group-hover:scale-110 duration-300 transition-all"
									alt={item?.judul}
								/>
							) : (
								<div className="flex items-center justify-center bg-primary text-white w-30 h-30">
									{getInitials(item?.judul)}
								</div>
							)}
						</div>

						<div className="flex flex-col flex-1 gap-2">
							<p className="line-clamp-3 font-medium group-hover:text-sky-700 duration-300 transition-colors">
								{item?.judul}
							</p>

							<div className="flex flex-col gap-1">
								<div className="flex text-sm items-center gap-2">
									<JokoSpiralCalendar />
									<p>
										{item?.tanggal
											? dayjs(item?.tanggal).locale("id").format("DD-MM-YYYY")
											: "-"}
									</p>
								</div>

								<div className="flex text-sm items-center gap-2">
									<JokoManTechnology />
									<p>{item?.dibaca || "0"} dibaca</p>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
