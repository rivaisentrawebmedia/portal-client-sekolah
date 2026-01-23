import { useSearchParams } from "react-router-dom";
import { useGetHariLibur } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { ButtonTambah, TableHariLibur } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";

export default function HariLiburPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-hari-libur");
	const limit = searchParams.get("limit-hari-libur");
	const search = searchParams.get("search-hari-libur");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetHariLibur(paramsDefault);

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
							label: "Hari Libur",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Hari Libur</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect pageKey="page-hari-libur" limitKey="limit-hari-libur" />
					<SearchInput
						pageKey="page-hari-libur"
						searchKey="search-hari-libur"
					/>
				</div>
				<TableHariLibur
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-hari-libur" />
				)}
			</div>
		</>
	);
}
