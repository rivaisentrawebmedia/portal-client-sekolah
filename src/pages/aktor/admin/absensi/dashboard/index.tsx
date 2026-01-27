import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { useGetProfile } from "../../portal-admin/profile/controller";
import { useGetDashboard, useGetNotifikasiCuti } from "./controllers";
import {
	CardDashboard,
	TableDataTerlambat,
	TableNotifCuti,
} from "./components";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FilterDashboardSchema } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { InputCommon } from "@/components/common/basic-input";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function PresensiDashboardPage() {
	const { data: dataProfile } = useGetProfile();
	const { data: dataNotif, loading: loadingNotif } = useGetNotifikasiCuti();

	const form = useForm<zod.infer<typeof FilterDashboardSchema>>({
		resolver: zodResolver(FilterDashboardSchema),
		mode: "onSubmit",
	});

	const [searchParams, setSearchParams] = useSearchParams();

	const tanggal =
		searchParams.get("tanggal") || dayjs().locale("id").format("YYYY-MM-DD");

	const paramsDefault = {
		tanggal: tanggal,
	};

	const { data: dashboard, loading: loadingDashboard } =
		useGetDashboard(paramsDefault);

	useEffect(() => {
		if (tanggal) {
			form.setValue("tanggal", tanggal);
		}
	}, [tanggal]);

	const chartData = useMemo(
		() => [
			{ label: "Hadir", value: dashboard?.hadir ?? 0 },
			{ label: "Alfa", value: dashboard?.alpha ?? 0 },
			{ label: "Tugas Luar", value: dashboard?.tugas_luar ?? 0 },
			{ label: "Izin", value: dashboard?.izin ?? 0 },
			{ label: "Sakit", value: dashboard?.sakit ?? 0 },
			{ label: "Cuti", value: dashboard?.cuti ?? 0 },
		],
		[dashboard],
	);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
						},
					]}
				/>
				<p className="text-lg">
					Selamat Datang,{" "}
					<span className="font-medium text-primary">
						{dataProfile?.nama || "?"}
					</span>
				</p>

				{dataNotif?.length > 0 && (
					<div className="flex flex-col gap-4 rounded-md rounded-2x border  border-[#1e5916] p-4">
						<p className="font-medium">Pengajuan Cuti & Izin</p>
						<TableNotifCuti
							data={dataNotif || []}
							loading={loadingNotif}
							limit={1000}
							page={1}
							search={""}
						/>
					</div>
				)}

				<div className="flex md:items-center md:flex-row flex-col md:justify-between gap-4">
					<div className="flex items-center gap-2">
						<p>Laporan Hari Ini</p>
						<Form {...form}>
							<form className="w-fit">
								<InputCommon
									form={form}
									name="tanggal"
									disabled={loadingDashboard}
									type="date"
									fx={(e) => {
										const newParams = new URLSearchParams(searchParams);
										newParams.set("tanggal", e);

										setSearchParams(newParams);
									}}
								/>
							</form>
						</Form>
					</div>
					<p>
						Jumlah Pegawai:{" "}
						<span className="font-medium text-primary">
							{dashboard?.jumlah_pegawai}
						</span>
					</p>
				</div>

				<div className="flex flex-col gap-4 p-4 border-[#1e5916] border rounded-md">
					<CardDashboard
						data={dashboard}
						tanggal={tanggal}
						loading={loadingDashboard}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={chartData}
								layout="horizontal" // bar berdiri (atas–bawah)
								margin={{ top: 16, right: 24, left: 0, bottom: 24 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="label" tickLine={false} axisLine={false} />
								<YAxis
									allowDecimals={false}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip />
								<Bar
									dataKey="value"
									fill="#1e5916"
									radius={[6, 6, 0, 0]}
									barSize={36}
								/>
							</BarChart>
						</ResponsiveContainer>
						<div className="flex flex-col gap-4 p-4 border-[#1e5916] border rounded-md">
							<p>Pegawai Yang Terlambat</p>
							<TableDataTerlambat
								data={dashboard?.pegawai_terlambat?.slice(0, 5) || []}
								loading={loadingNotif}
								limit={1000}
								page={1}
								search={""}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
