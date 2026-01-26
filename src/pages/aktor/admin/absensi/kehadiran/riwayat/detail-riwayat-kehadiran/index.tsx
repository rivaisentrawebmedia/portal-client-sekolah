import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import { useGetRiwayatKehadiran } from "./controller";
import { useSearchParams } from "react-router-dom";
import {
	FilterRiwayatKehadiranSchema,
	type GetRiwayatKehadiranParams,
} from "./model";
import { usePathname } from "@/utils/usePathname";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { getTahunOptions } from "@/const/listTanggal";
import { TableRiwayatKehadiran } from "./components";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export default function RiwayatKehadiranPage() {
	const { fivethPathname } = usePathname();
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterRiwayatKehadiranSchema>>({
		resolver: zodResolver(FilterRiwayatKehadiranSchema),
		mode: "onSubmit",
	});

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");

	const paramsDefault: GetRiwayatKehadiranParams = {
		pegawai_id: fivethPathname || "",
		tahun: tahun || "",
	};

	const { data, loading } = useGetRiwayatKehadiran(paramsDefault);

	useEffect(() => {
		if (tahun) {
			form.setValue("tahun", tahun);
		}
	}, [tahun]);

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
							to: `/admin/presensi/kehadiran/riwayat-kehadiran`,
						},
						{
							label: "Riwayat Kehadiran",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">Riwayat Kehadiran</p>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<Form {...form}>
						<form className="flex flex-col w-full gap-4">
							<SelectCommon
								form={form}
								name="tahun"
								options={getTahunOptions()}
								label="Tahun"
								className="w-full md:w-1/4"
								placeholder="Pilih tahun"
								fx={(value) => {
									const newParams = new URLSearchParams(
										searchParams.toString(),
									);

									newParams.set("tahun", value);

									setSearchParams(newParams);
								}}
							/>
						</form>
					</Form>

					{tahun ? (
						<>
							<TableRiwayatKehadiran
								data={data}
								loading={loading}
								limit={1000}
								page={1}
								search={""}
								pegawai_id={fivethPathname || ""}
							/>
						</>
					) : (
						<Empty className="border-0 rounded-none">
							<EmptyHeader>
								<EmptyTitle>Tahun belum dipilih</EmptyTitle>
								<EmptyDescription>
									Silakan pilih tahun terlebih dahulu untuk melanjutkan.
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
				</div>
			</div>
		</>
	);
}
