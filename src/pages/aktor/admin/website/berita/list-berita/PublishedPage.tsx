import { useSearchParams } from "react-router-dom";
import { useGetBerita } from "./controller";
import type { GetBeritaParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableBeritaPublish } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function BeritaPublishedPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-berita-publish");
	const limit = searchParams.get("limit-berita-publish");
	const search = searchParams.get("search-berita-publish");

	const paramsDefault: GetBeritaParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "publish",
		urutkan: "terbaru",
	};

	const { data, loading, meta } = useGetBerita(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-berita-publish"
					limitKey="limit-berita-publish"
				/>
				<SearchInput
					pageKey="page-berita-publish"
					searchKey="search-berita-publish"
				/>
			</div>
			<TableBeritaPublish
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-berita-publish" />
			)}
		</>
	);
}
