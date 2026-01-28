import { useSearchParams } from "react-router-dom";
import { useGetPrestasi } from "./controller";
import type { GetPrestasiParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TablePrestasiDraft } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function PrestasiDraftPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-prestasi-draft");
	const limit = searchParams.get("limit-prestasi-draft");
	const search = searchParams.get("search-prestasi-draft");

	const paramsDefault: GetPrestasiParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "draft",
	};

	const { data, loading, meta } = useGetPrestasi(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-prestasi-draft"
					limitKey="limit-prestasi-draft"
				/>
				<SearchInput
					pageKey="page-prestasi-draft"
					searchKey="search-prestasi-draft"
				/>
			</div>
			<TablePrestasiDraft
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-prestasi-draft" />
			)}
		</>
	);
}
