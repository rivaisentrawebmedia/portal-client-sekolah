import { useSearchParams } from "react-router-dom";
import { useGetPrestasi } from "./controller";
import type { GetPrestasiParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TablePrestasiPublish } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function PrestasiPublishedPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-prestasi-publish");
	const limit = searchParams.get("limit-prestasi-publish");
	const search = searchParams.get("search-prestasi-publish");

	const paramsDefault: GetPrestasiParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "publish",
	};

	const { data, loading, meta } = useGetPrestasi(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-prestasi-publish"
					limitKey="limit-prestasi-publish"
				/>
				<SearchInput
					pageKey="page-prestasi-publish"
					searchKey="search-prestasi-publish"
				/>
			</div>
			<TablePrestasiPublish
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-prestasi-publish" />
			)}
		</>
	);
}
