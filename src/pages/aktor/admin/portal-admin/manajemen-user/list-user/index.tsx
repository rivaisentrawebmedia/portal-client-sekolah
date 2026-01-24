import { useSearchParams } from "react-router-dom";
import { ButtonTambah, TableManajemenUser } from "./components";
import { useGetManajemenUser } from "./controller";
import { SearchInput } from "@/components/common/searchInput";
import { LimitSelect } from "@/components/common/limitSelect";
import { Pagination } from "@/components/common/pagination";

export default function ManajemenUserPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page-manajemen-usar");
	const limit = searchParams.get("limit-manajemen-usar");
	const search = searchParams.get("search-manajemen-usar");

	const paramsDefault = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetManajemenUser(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Manajemen User</p>
					<ButtonTambah />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-manajemen-usar"
						limitKey="limit-manajemen-usar"
					/>
					<SearchInput
						pageKey="page-manajemen-usar"
						searchKey="search-manajemen-usar"
					/>
				</div>
				<TableManajemenUser
					data={data}
					loading={loading}
					limit={paramsDefault?.limit}
					page={paramsDefault?.page}
					search={paramsDefault?.search}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-manajemen-usar" />
				)}
			</div>
		</>
	);
}
