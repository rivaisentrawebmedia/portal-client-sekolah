import { useSearchParams } from "react-router-dom";
import { useGetStatusAbsen } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { TableStatusAbsen } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function StatusAbsenPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-pegawai-absensi");
	const limit = searchParams.get("limit-pegawai-absensi");
	const search = searchParams.get("search-pegawai-absensi");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetStatusAbsen(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/modules/presensi",
						},
						{
							label: "Set Status Absen Perangkat",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">
						Set Status Absen Perangkat
					</p>
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-pegawai-absensi"
						limitKey="limit-pegawai-absensi"
					/>
					<SearchInput
						pageKey="page-pegawai-absensi"
						searchKey="search-pegawai-absensi"
					/>
				</div>
				<TableStatusAbsen
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-pegawai-absensi" />
				)}
			</div>
		</>
	);
}
