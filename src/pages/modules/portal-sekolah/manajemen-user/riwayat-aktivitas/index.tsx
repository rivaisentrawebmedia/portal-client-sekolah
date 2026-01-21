import { ArrowBack } from "@/components/common/ArrowBack";
import { useSearchParams } from "react-router-dom";
import {
	useGetManajemenUserByID,
	useGetRiwayatAktivitas,
} from "../list-user/controller";
import { DetailUser } from "../tambah-user/kontrol-akses/components";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import {
	FilterRiwayatAktivitasSchema,
	type GetRiwayatAktivitasParams,
} from "../list-user/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { TableRiwayatAktivitas } from "./components";
import { Pagination } from "@/components/common/pagination";
import { Form } from "@/components/ui/form";
import { JangkaWaktuOptions } from "@/const/listJangkaWaktu";
import { SelectCommon } from "@/components/common/basic-input";

export default function RiwayatAktivitasPage() {
	const [params] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterRiwayatAktivitasSchema>>({
		resolver: zodResolver(FilterRiwayatAktivitasSchema),
		mode: "onSubmit",
	});

	const { data, loading } = useGetManajemenUserByID();

	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page-riwayat-aktivitas");
	const limit = searchParams.get("limit-riwayat-aktivitas");
	const search = searchParams.get("search-riwayat-aktivitas");
	const user_id = searchParams.get("user-id");
	const jangka_waktu = searchParams.get("jangka-waktu");

	const paramsDefault: GetRiwayatAktivitasParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || undefined,
		jangka_waktu: jangka_waktu || "",
		id: user_id || "",
	};

	const {
		data: dataRiwayat,
		loading: loadingRiwayat,
		meta,
	} = useGetRiwayatAktivitas(paramsDefault);

	const defaultData = {
		label: "Tampilkan Semua",
		value: "tampilkan-semua",
	};

	const jangkaWaktuOptions = [defaultData, ...JangkaWaktuOptions];

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<ArrowBack
					link={`/modules/manajemen-user?${params?.toString()}`}
					title="Riwayat Aktivitas"
				/>

				<div className="flex flex-col gap-4 md:flex-row md:items-center ">
					<p className="text-nowrap text-[#1E5916]">Informasi User</p>
					<hr className="border-t w-full" />
				</div>

				<DetailUser data={data} loading={loading} />

				<div className="flex flex-col gap-4 md:flex-row md:items-center ">
					<p className="text-nowrap text-[#1E5916]">Riwayat Aktivitas</p>
					<hr className="border-t w-full" />
				</div>

				<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
					<LimitSelect
						pageKey="page-riwayat-aktivitas"
						limitKey="limit-riwayat-aktivitas"
					/>
					<SearchInput
						pageKey="page-riwayat-aktivitas"
						searchKey="search-riwayat-aktivitas"
					/>
					<Form {...form}>
						<form className="flex flex-row w-full md:w-1/4">
							<SelectCommon
								form={form}
								name="jangka_waktu"
								placeholder="Pilih Jangka Waktu"
								isMulti={false}
								className="w-full"
								options={jangkaWaktuOptions}
								fx={(value) => {
									const newParams = new URLSearchParams(
										searchParams.toString(),
									);

									newParams.set("jangka-waktu", value);

									setSearchParams(newParams);
								}}
							/>
						</form>
					</Form>
				</div>
				<TableRiwayatAktivitas
					data={dataRiwayat}
					loading={loadingRiwayat}
					limit={paramsDefault?.limit || 10}
					page={paramsDefault?.page || 1}
					search={paramsDefault?.search || ""}
				/>
				{dataRiwayat?.length > 0 && (
					<Pagination meta={meta} pageKey="page-riwayat-aktivitas" />
				)}
			</div>
		</>
	);
}
