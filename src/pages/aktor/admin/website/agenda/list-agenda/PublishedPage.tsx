import { useSearchParams } from "react-router-dom";
import { useGetAgenda } from "./controller";
import type { GetAgendaParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableAgendaPublish } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function AgendaPublishedPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-agenda-publish");
	const limit = searchParams.get("limit-agenda-publish");
	const search = searchParams.get("search-agenda-publish");

	const paramsDefault: GetAgendaParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "publish",
	};

	const { data, loading, meta } = useGetAgenda(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-agenda-publish"
					limitKey="limit-agenda-publish"
				/>
				<SearchInput
					pageKey="page-agenda-publish"
					searchKey="search-agenda-publish"
				/>
			</div>
			<TableAgendaPublish
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-agenda-publish" />
			)}
		</>
	);
}
