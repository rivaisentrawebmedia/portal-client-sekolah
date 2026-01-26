import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";

export default function KegiatanHarianPage() {
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
				<p className="text-2xl text-[#1E5916] font-medium">Kegiatan Harian</p>

				<InformasiPegawai />
			</div>
		</>
	);
}
