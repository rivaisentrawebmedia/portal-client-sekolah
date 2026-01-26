import { useGetRekapHarian } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { TabCuti, TableRekapHarian } from "./components";
import { FilterRekapHarianSchema, type GetRekapHarianParams } from "./model";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCommon } from "@/components/common/basic-input";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDashboard } from "../../dashboard/controllers";
import dayjs from "dayjs";

export default function RekapHarianPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const listStatus = [
		"hadir",
		"sakit",
		"izin",
		"cuti",
		"alpha",
		"perjalanan_dinas",
		"semua",
	];

	const status = searchParams.get("status") || listStatus?.[0];
	const tanggal =
		searchParams.get("tanggal") || dayjs().locale("id").format("YYYY-MM-DD");

	const paramsDefault: GetRekapHarianParams = {
		status: status || "",
		tanggal: tanggal || "",
	};

	const form = useForm<zod.infer<typeof FilterRekapHarianSchema>>({
		resolver: zodResolver(FilterRekapHarianSchema),
		mode: "onSubmit",
	});

	const { data, loading, meta } = useGetRekapHarian(paramsDefault);
	const { data: dataDashboard } = useGetDashboard({
		tanggal: tanggal,
	});

	useEffect(() => {
		if (tanggal) {
			form.setValue("tanggal", tanggal);
		}
	}, [tanggal]);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Rekap Harian",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">Rekap Harian</p>

				<Form {...form}>
					<form className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
						<InputCommon
							form={form}
							name="tanggal"
							disabled={loading}
							type="date"
							className="w-full md:w-1/4"
							fx={(e) => {
								const newParams = new URLSearchParams(searchParams);
								newParams.set("tanggal", e);

								setSearchParams(newParams);
							}}
						/>
						<p>
							Jumlah Pegawai:{" "}
							<span className="font-medium">
								{dataDashboard?.jumlah_pegawai || 0}
							</span>
						</p>
					</form>
				</Form>

				<div className="flex flex-col">
					<TabCuti
						listStatus={listStatus}
						statusParams={status}
						meta={meta}
						dashboard={dataDashboard}
					/>

					<div className="flex flex-col gap-4 p-4 border-x border-b border-primary">
						<TableRekapHarian
							data={data}
							loading={loading}
							limit={1000}
							page={1}
							search={""}
							status={status}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
