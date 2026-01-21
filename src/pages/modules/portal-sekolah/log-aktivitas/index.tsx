import { useSearchParams } from "react-router-dom";
import { SearchInput } from "@/components/common/searchInput";
import { LimitSelect } from "@/components/common/limitSelect";
import { Pagination } from "@/components/common/pagination";
import { useForm } from "react-hook-form";
import { LogAktivitasSchema, type GetLogAktivitasParams } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useGetLogAktivitas } from "./controller";
import { FilterLogAktivitas, TableLogAktivitas } from "./components";
import { Button } from "@/components/ui/button";
import { FaRecycle } from "react-icons/fa";

export default function LogAktivitasPage() {
	const form = useForm<zod.infer<typeof LogAktivitasSchema>>({
		resolver: zodResolver(LogAktivitasSchema),
		mode: "onSubmit",
	});

	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page-log-aktivitas");
	const limit = searchParams.get("limit-log-aktivitas");
	const search = searchParams.get("search-log-aktivitas");
	const jangka_waktu = searchParams.get("jangka-waktu");
	const modul_id = searchParams.get("modul-id");
	const user_id = searchParams.get("user-id");

	const paramsDefault: GetLogAktivitasParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		jangka_waktu:
			jangka_waktu === "tampilkan-semua"
				? undefined
				: jangka_waktu || undefined,
		modul_id:
			modul_id === "tampilkan-semua" ? undefined : modul_id || undefined,
		user_id: user_id || undefined,
	};

	const { data, loading, meta } = useGetLogAktivitas(paramsDefault);

	return (
		<>
			<div className="flex flex-col gap-4">
				<p className="text-2xl text-[#1E5916] font-medium">Log Aktivitas</p>

				<FilterLogAktivitas form={form} />

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-log-aktivitas"
						limitKey="limit-log-aktivitas"
					/>
					<SearchInput
						pageKey="page-log-aktivitas"
						searchKey="search-log-aktivitas"
					/>

					<Button
						type="button"
						className=""
						onClick={() => {
							setSearchParams({});
							form.reset();
						}}
						variant="destructive"
					>
						<FaRecycle />
						Reset Filter
					</Button>
				</div>
				<TableLogAktivitas
					data={data}
					loading={loading}
					limit={paramsDefault?.limit || 10}
					page={paramsDefault?.page || 1}
					search={paramsDefault?.search || ""}
				/>
				{data?.length > 0 && (
					<Pagination meta={meta} pageKey="page-log-aktivitas" />
				)}
			</div>
		</>
	);
}
