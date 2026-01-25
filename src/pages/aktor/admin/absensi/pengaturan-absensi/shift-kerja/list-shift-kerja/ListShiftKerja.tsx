import { useSearchParams } from "react-router-dom";
import { useGetShiftKerja } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { ButtonTambah, TableShiftKerja } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function ShiftKerjaPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-shift-kerja");
	const limit = searchParams.get("limit-shift-kerja");
	const search = searchParams.get("search-shift-kerja");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetShiftKerja(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Shift Kerja",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Shift Kerja</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-shift-kerja"
						limitKey="limit-shift-kerja"
					/>
					<SearchInput
						pageKey="page-shift-kerja"
						searchKey="search-shift-kerja"
					/>
				</div>
				<TableShiftKerja
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-shift-kerja" />
				)}
			</div>
		</>
	);
}
