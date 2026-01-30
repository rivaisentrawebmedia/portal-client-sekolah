import { useSearchParams } from "react-router-dom";
import { useGetJenisBiaya } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { ButtonTambah, TableJenisBiaya } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function JenisBiayaPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-jenis-biaya");
	const limit = searchParams.get("limit-jenis-biaya");
	const search = searchParams.get("search-jenis-biaya");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetJenisBiaya(paramsDefault);

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
							label: "Jenis Biaya",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#161646] font-medium">Jenis Biaya</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-jenis-biaya"
						limitKey="limit-jenis-biaya"
					/>
					<SearchInput
						pageKey="page-jenis-biaya"
						searchKey="search-jenis-biaya"
					/>
				</div>
				<TableJenisBiaya
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-jenis-biaya" />
				)}
			</div>
		</>
	);
}
