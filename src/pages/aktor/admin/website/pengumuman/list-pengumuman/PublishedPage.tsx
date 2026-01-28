import { useSearchParams } from "react-router-dom";
import { useGetPengumuman } from "./controller";
import type { GetPengumumanParams } from "./model";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TablePengumumanPublish } from "./components/TableData";
import { Pagination } from "@/components/common/pagination";

export default function PengumumanPublishedPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-pengumuman-publish");
	const limit = searchParams.get("limit-pengumuman-publish");
	const search = searchParams.get("search-pengumuman-publish");

	const paramsDefault: GetPengumumanParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: "publish",
	};

	const { data, loading, meta } = useGetPengumuman(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect
					pageKey="page-pengumuman-publish"
					limitKey="limit-pengumuman-publish"
				/>
				<SearchInput
					pageKey="page-pengumuman-publish"
					searchKey="search-pengumuman-publish"
				/>
			</div>
			<TablePengumumanPublish
				data={data}
				loading={loading}
				limit={Number(limit)}
				page={Number(page)}
				search={search || ""}
				status="draft"
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-pengumuman-publish" />
			)}
		</>
	);
}
