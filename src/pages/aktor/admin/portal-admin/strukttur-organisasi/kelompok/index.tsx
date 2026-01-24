import { useSearchParams } from "react-router-dom";
import { ButtonTambah, TableKelompok } from "./components";
import { useGetKelompok } from "./controller";
import { SearchInput } from "@/components/common/searchInput";
import { LimitSelect } from "@/components/common/limitSelect";
import { Pagination } from "@/components/common/pagination";

export default function KelompokPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-kelompok");
	const limit = searchParams.get("limit-kelompok");
	const search = searchParams.get("search-kelompok");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetKelompok(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Kelompok</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect pageKey="page-kelompok" limitKey="limit-kelompok" />
					<SearchInput pageKey="page-kelompok" searchKey="search-kelompok" />
				</div>
				<TableKelompok
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && <Pagination meta={meta} pageKey="page-kelompok" />}
			</div>
		</>
	);
}
