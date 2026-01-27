import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetRekapPerOrangByID } from "./controller";
import dayjs from "dayjs";
import type { GetRekapPerOrangParams } from "./model";
import { usePathname } from "@/utils/usePathname";
import { getBulanOptions } from "@/const/listTanggal";
import { FaCalendar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TableRekapPerOrang } from "./components";

export default function RekapPerOrangDetailPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { fivethPathname } = usePathname();

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = searchParams.get("bulan") || dayjs().locale("id").format("MM");

	const paramsDefault: GetRekapPerOrangParams = {
		tahun: Number(tahun),
		bulan: Number(bulan),
		pegawai_id: fivethPathname || "",
	};

	const { data, loading } = useGetRekapPerOrangByID(paramsDefault);

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
							to: `/admin/presensi/laporan-kehadiran/rekap-per-orang?${searchParams?.toString()}`,
						},
						{
							label: "Rekap Per Orang",
						},
					]}
				/>
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Rekap Per Orang</p>
					<div className="flex items-center gap-2">
						{data?.prev && (
							<Link
								to={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${data?.prev?.pegawai_id}/rekap-per-orang?user-id=${data?.prev?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-primary"
							>
								<FaChevronLeft size={14} />
								{data?.prev?.nama}
							</Link>
						)}

						{data?.next && (
							<Link
								to={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${data?.next?.pegawai_id}/rekap-per-orang?user-id=${data?.next?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
								className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-primary"
							>
								{data?.next?.nama}
								<FaChevronRight size={14} />
							</Link>
						)}
					</div>
				</div>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<p>
						Keterangan Kehadiran{" "}
						<span className="font-medium text-primary">
							{getBulanOptions()?.find(
								(list) =>
									list?.value?.toString() === String(bulan)?.padStart(2, "0"),
							)?.label || "-"}{" "}
							{tahun}
						</span>
					</p>
					<Button
						type="button"
						onClick={() => {
							navigate(
								`/admin/presensi/laporan-kehadiran/rekap-bulanan/${fivethPathname}/rekap-bulanan?user-id=${fivethPathname}}&tahun=${tahun}}&bulan=${bulan}`,
							);
						}}
						className="w-fit rounded-full border-primary text-primary hover:text-primary"
						variant={"outline"}
					>
						<FaCalendar />
						Lihat Keterangan Harian
					</Button>

					<TableRekapPerOrang
						data={data?.items || []}
						loading={loading}
						limit={1000}
						page={1}
						search={""}
					/>
				</div>
			</div>
		</>
	);
}
