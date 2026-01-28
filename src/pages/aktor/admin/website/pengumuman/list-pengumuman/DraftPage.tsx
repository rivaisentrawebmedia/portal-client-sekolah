import { useSearchParams } from "react-router-dom";
import { useGetPengumuman } from "./controller";
import type { GetPengumumanParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TablePengumumanDraft } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function PengumumanDraftPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-pengumuman-draft");
	const limit = searchParams.get("limit-pengumuman-draft");
	const search = searchParams.get("search-pengumuman-draft");

	const paramsDefault: GetPengumumanParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "draft",
	};

	const { data, loading, meta } = useGetPengumuman(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-pengumuman-draft"
					limitKey="limit-pengumuman-draft"
				/>
				<SearchInput
					pageKey="page-pengumuman-draft"
					searchKey="search-pengumuman-draft"
				/>
			</div>
			<TablePengumumanDraft
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-pengumuman-draft" />
			)}
		</>
	);
}
