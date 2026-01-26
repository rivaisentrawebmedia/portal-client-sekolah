import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { useSearchParams } from "react-router-dom";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import { TableDaftarPegawai } from "./components";
import { useGetManajemenUser } from "@/pages/aktor/admin/portal-admin/manajemen-user/list-user/controller";

export default function DaftarPegawaiPageRiwayatKehadiran() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-manajemen-usar");
	const limit = searchParams.get("limit-manajemen-usar");
	const search = searchParams.get("search-manajemen-usar");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetManajemenUser(paramsDefault);

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
							label: "Daftar Pegawai",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">Daftar Pegawai</p>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-manajemen-usar"
						limitKey="limit-manajemen-usar"
					/>
					<SearchInput
						pageKey="page-manajemen-usar"
						searchKey="search-manajemen-usar"
					/>
				</div>
				<TableDaftarPegawai
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-manajemen-usar" />
				)}
			</div>
		</>
	);
}
