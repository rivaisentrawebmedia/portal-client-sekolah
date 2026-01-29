import { useSearchParams } from "react-router-dom";
import { useGetSuratTugas } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import { ButtonTambah, TableSuratTugas } from "./components";

export default function SuratTugasPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-surat-tugas");
	const limit = searchParams.get("limit-surat-tugas");
	const search = searchParams.get("search-surat-tugas");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetSuratTugas(paramsDefault);

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
							label: "Surat Tugas",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl font-medium">Daftar Surat Tugas</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-surat-tugas"
						limitKey="limit-surat-tugas"
					/>
					<SearchInput
						pageKey="page-surat-tugas"
						searchKey="search-surat-tugas"
					/>
				</div>
				<TableSuratTugas
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-surat-tugas" color="#161646" />
				)}
			</div>
		</>
	);
}
