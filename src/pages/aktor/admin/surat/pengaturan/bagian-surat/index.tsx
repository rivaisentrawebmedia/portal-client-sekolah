import { useSearchParams } from "react-router-dom";
import { useGetBagianSurat } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { ButtonTambah, TableBagianSurat } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function BagianSuratPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-periode-cuti");
	const limit = searchParams.get("limit-periode-cuti");
	const search = searchParams.get("search-periode-cuti");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetBagianSurat(paramsDefault);

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
							label: "Bagian Surat",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl font-medium">Bagian Surat</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-periode-cuti"
						limitKey="limit-periode-cuti"
					/>
					<SearchInput
						pageKey="page-periode-cuti"
						searchKey="search-periode-cuti"
					/>
				</div>
				<TableBagianSurat
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-periode-cuti" />
				)}
			</div>
		</>
	);
}
