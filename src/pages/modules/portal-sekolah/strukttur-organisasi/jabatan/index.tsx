import { useSearchParams } from "react-router-dom";
import { ButtonTambah, TableJabatan } from "./components";
import { useGetJabatan } from "./controller";
import { SearchInput } from "@/components/common/searchInput";
import { LimitSelect } from "@/components/common/limitSelect";
import { Pagination } from "@/components/common/pagination";

export default function JabatanPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-jabatan");
	const limit = searchParams.get("limit-jabatan");
	const search = searchParams.get("search-jabatan");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetJabatan(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Jabatan</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect pageKey="page-jabatan" limitKey="limit-jabatan" />
					<SearchInput pageKey="page-jabatan" searchKey="search-jabatan" />
				</div>
				<TableJabatan
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && <Pagination meta={meta} pageKey="page-jabatan" />}
			</div>
		</>
	);
}
