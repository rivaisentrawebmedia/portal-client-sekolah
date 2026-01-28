import { useSearchParams } from "react-router-dom";
import { useGetAgenda } from "./controller";
import type { GetAgendaParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableAgendaDraft } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function AgendaDraftPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-agenda-draft");
	const limit = searchParams.get("limit-agenda-draft");
	const search = searchParams.get("search-agenda-draft");

	const paramsDefault: GetAgendaParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "draft",
	};

	const { data, loading, meta } = useGetAgenda(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-agenda-draft"
					limitKey="limit-agenda-draft"
				/>
				<SearchInput
					pageKey="page-agenda-draft"
					searchKey="search-agenda-draft"
				/>
			</div>
			<TableAgendaDraft
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-agenda-draft" />
			)}
		</>
	);
}
