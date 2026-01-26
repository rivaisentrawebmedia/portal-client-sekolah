import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import {
	FilterKegiatanHarianSchema,
	type GetKegiatanHarianParams,
} from "./model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import * as zod from "zod";
import { usePathname } from "@/utils/usePathname";
import dayjs from "dayjs";
import { useGetKegiatanHarian } from "./controller";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { getBulanOptions, getTahunOptions } from "@/const/listTanggal";
import { ButtonTambah, TableKegiatanHarian } from "./components";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export default function KegiatanHarianPage() {
	const { fivethPathname } = usePathname();
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterKegiatanHarianSchema>>({
		resolver: zodResolver(FilterKegiatanHarianSchema),
		mode: "onSubmit",
	});

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = searchParams.get("bulan") || dayjs().locale("id").format("MM");

	const paramsDefault: GetKegiatanHarianParams = {
		pegawai_id: fivethPathname || "",
		tahun: tahun || "",
		bulan: bulan || "",
	};

	const { data, loading } = useGetKegiatanHarian(paramsDefault);

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
							to: `/admin/presensi/kehadiran/kegiatan-harian`,
						},
						{
							label: "Kegiatan Harian",
						},
					]}
				/>
				<div className="flex justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Kegiatan Harian</p>
					<ButtonTambah />
				</div>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<Form {...form}>
						<form className="flex flex-col w-full gap-2 md:flex-row md:gap-4">
							<SelectCommon
								form={form}
								name="tahun"
								options={getTahunOptions()}
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

							<SelectCommon
								form={form}
								name="bulan"
								options={getBulanOptions()}
								className="w-full md:w-1/4"
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

					{tahun && bulan ? (
						<>
							<TableKegiatanHarian
								data={data}
								loading={loading}
								limit={1000}
								page={1}
								search={""}
							/>
						</>
					) : (
						<Empty className="border-0 rounded-none">
							<EmptyHeader>
								<EmptyTitle>Tahun atau bulan belum dipilih</EmptyTitle>
								<EmptyDescription>
									Silakan pilih tahun dan bulan terlebih dahulu untuk
									melanjutkan.
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
				</div>
			</div>
		</>
	);
}
