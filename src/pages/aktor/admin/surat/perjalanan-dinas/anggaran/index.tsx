import { useSearchParams } from "react-router-dom";
import { useGetAnggaran } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { ButtonTambah, TableAnggaran } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function AnggaranPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-anggaran");
	const limit = searchParams.get("limit-anggaran");
	const search = searchParams.get("search-anggaran");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetAnggaran(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/surat",
						},
						{
							label: "Anggaran",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#161646] font-medium">Anggaran</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect pageKey="page-anggaran" limitKey="limit-anggaran" />
					<SearchInput pageKey="page-anggaran" searchKey="search-anggaran" />
				</div>
				<TableAnggaran
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && <Pagination meta={meta} pageKey="page-anggaran" />}
			</div>
		</>
	);
}
