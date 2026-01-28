import { useSearchParams } from "react-router-dom";
import { useGetMading } from "./controller";
import type { GetMadingParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableMadingDraft } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function MadingDraftPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-mading-draft");
	const limit = searchParams.get("limit-mading-draft");
	const search = searchParams.get("search-mading-draft");

	const paramsDefault: GetMadingParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "draft",
	};

	const { data, loading, meta } = useGetMading(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-mading-draft"
					limitKey="limit-mading-draft"
				/>
				<SearchInput
					pageKey="page-mading-draft"
					searchKey="search-mading-draft"
				/>
			</div>
			<TableMadingDraft
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-mading-draft" />
			)}
		</>
	);
}
