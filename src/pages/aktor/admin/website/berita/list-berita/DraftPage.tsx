import { useSearchParams } from "react-router-dom";
import { useGetBerita } from "./controller";
import type { GetBeritaParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableBeritaDraft } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function BeritaDraftPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-berita-draft");
	const limit = searchParams.get("limit-berita-draft");
	const search = searchParams.get("search-berita-draft");

	const paramsDefault: GetBeritaParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "draft",
		urutkan: "terbaru",
	};

	const { data, loading, meta } = useGetBerita(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-berita-draft"
					limitKey="limit-berita-draft"
				/>
				<SearchInput
					pageKey="page-berita-draft"
					searchKey="search-berita-draft"
				/>
			</div>
			<TableBeritaDraft
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-berita-draft" />
			)}
		</>
	);
}
