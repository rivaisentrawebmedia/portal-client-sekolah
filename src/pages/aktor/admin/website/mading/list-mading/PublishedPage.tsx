import { useSearchParams } from "react-router-dom";
import { useGetMading } from "./controller";
import type { GetMadingParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableMadingPublish } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function MadingPublishedPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-mading-publish");
	const limit = searchParams.get("limit-mading-publish");
	const search = searchParams.get("search-mading-publish");

	const paramsDefault: GetMadingParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "publish",
	};

	const { data, loading, meta } = useGetMading(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-mading-publish"
					limitKey="limit-mading-publish"
				/>
				<SearchInput
					pageKey="page-mading-publish"
					searchKey="search-mading-publish"
				/>
			</div>
			<TableMadingPublish
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-mading-publish" />
			)}
		</>
	);
}
