import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useGetRekapBulananByID } from "./controller";
import { useForm } from "react-hook-form";
import { FilterRekapBulananSchema } from "../daftar-pegawai/model";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import dayjs from "dayjs";
import type { GetRekapBulananParams } from "./model";
import { usePathname } from "@/utils/usePathname";
import { BasicLabel } from "@/components/common/BasicLabel";
import { getBulanOptions, getTahunOptions } from "@/const/listTanggal";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function RekapBulananDetailPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { fivethPathname } = usePathname();

	const form = useForm<zod.infer<typeof FilterRekapBulananSchema>>({
		resolver: zodResolver(FilterRekapBulananSchema),
		mode: "onSubmit",
	});

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = searchParams.get("bulan") || dayjs().locale("id").format("MM");

	const paramsDefault: GetRekapBulananParams = {
		tahun: Number(tahun),
		bulan: Number(bulan),
		pegawai_id: fivethPathname || "",
	};

	const { data: dataChart } = useGetRekapBulananByID(paramsDefault);

	useEffect(() => {
		if (tahun) {
			form.setValue("tahun", tahun);
		}
	}, [tahun]);

	useEffect(() => {
		if (bulan) {
			form.setValue("bulan", bulan);
		}
	}, [bulan]);

	const chartData = useMemo(
		() => [
			{ label: "Hari Efektif", value: dataChart?.hari_efektif ?? 0 },
			{ label: "Hadir", value: dataChart?.hadir ?? 0 },
			{ label: "Tugas Luar", value: dataChart?.tugas_luar ?? 0 },
			{ label: "Izin", value: dataChart?.izin ?? 0 },
			{ label: "Alfa", value: dataChart?.alpha ?? 0 },
			{ label: "Cuti", value: dataChart?.cuti ?? 0 },
		],
		[dataChart],
	);

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
							label: "Daftar Pegawai",
							to: `/admin/presensi/laporan-kehadiran/rekap-bulanan?${searchParams?.toString()}`,
						},
						{
							label: "Rekap Bulanan",
						},
					]}
				/>
				<div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Rekap Bulanan</p>
					<div className="flex items-center gap-2">
						{dataChart?.prev && (
							<Link
								to={`/admin/presensi/laporan-kehadiran/rekap-bulanan/${dataChart?.prev?.pegawai_id}/rekap-bulanan?user-id=${dataChart?.prev?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-primary"
							>
								<FaChevronLeft size={14} />
								{dataChart?.prev?.nama}
							</Link>
						)}

						{dataChart?.next && (
							<Link
								to={`/admin/presensi/laporan-kehadiran/rekap-bulanan/${dataChart?.next?.pegawai_id}/rekap-bulanan?user-id=${dataChart?.next?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-primary"
							>
								{dataChart?.next?.nama}
								<FaChevronRight size={14} />
							</Link>
						)}
					</div>
				</div>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<div className="flex md:flex-row md:justify-between md:gap-4 flex-col gap-2">
						<BasicLabel
							label="Bulan"
							value={
								<p>
									{getBulanOptions()?.find(
										(list) =>
											list?.value?.toString() ===
											String(bulan)?.padStart(2, "0"),
									)?.label || "-"}{" "}
									{tahun}
								</p>
							}
							className="flex flex-row gap-2"
						/>
						<div className="flex flex-col flex-1 md:justify-end gap-2 md:flex-row md:gap-2.5">
							<Form {...form}>
								<form className="flex flex-col md:w-1/2 md:flex-row w-full gap-4">
									<SelectCommon
										form={form}
										name="tahun"
										options={getTahunOptions()}
										className="w-full md:w-1/2"
										placeholder="Pilih tahun"
										fx={(value) => {
											const newParams = new URLSearchParams(
												searchParams.toString(),
											);

											newParams.set("tahun", value);

											setSearchParams(newParams);
										}}
									/>

									<SelectCommon
										form={form}
										name="bulan"
										options={getBulanOptions()}
										className="w-full md:w-1/2"
										placeholder="Pilih bulan"
										fx={(value) => {
											const newParams = new URLSearchParams(
												searchParams.toString(),
											);

											newParams.set("bulan", value);

											setSearchParams(newParams);
										}}
									/>
								</form>
							</Form>
						</div>
					</div>

					<div className="mt-4 h-[420px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ top: 10, right: 24, left: 40, bottom: 10 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" allowDecimals={false} />
								<YAxis type="category" dataKey="label" width={120} />
								<Tooltip />
								<Bar dataKey="value" fill="#2563EB" radius={[0, 6, 6, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</>
	);
}
