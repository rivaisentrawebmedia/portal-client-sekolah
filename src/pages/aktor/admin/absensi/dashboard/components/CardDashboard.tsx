import { convertToSlug } from "@/utils/helpers";
import ImgHadir from "@/assets/images/hadir.png";
import ImgAlfa from "@/assets/images/alfa.png";
import ImgIzin from "@/assets/images/izin.png";
import ImgSakit from "@/assets/images/sakit.png";
import ImgTugasLuar from "@/assets/images/tugas-luar.png";
import ImgCuti from "@/assets/images/cuti.png";
import type { Dashboard } from "../model";
import { useNavigate } from "react-router-dom";

export function CardDashboard({
	data,
	tanggal,
	loading,
}: {
	data: Dashboard | undefined;
	tanggal: string;
	loading: boolean;
}) {
	const navigate = useNavigate();

	const card = [
		{ nama: "Hadir", img: ImgHadir, jumlah: data?.hadir || 0 },
		{ nama: "Alfa", img: ImgAlfa, jumlah: data?.alpha || 0 },
		{ nama: "Tugas Luar", img: ImgTugasLuar, jumlah: data?.tugas_luar || 0 },
		{ nama: "Izin", img: ImgIzin, jumlah: data?.izin || 0 },
		{ nama: "Sakit", img: ImgSakit, jumlah: data?.sakit || 0 },
		{ nama: "Cuti", img: ImgCuti, jumlah: data?.cuti || 0 },
	];

	if (loading) {
		return <CardDashboardSkeleton />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-6 gap-4">
			{card.map((item, idx) => (
				<div
					key={idx}
					onClick={() => {
						if (item.nama === "Alfa") {
							navigate(
								`/admin/presensi/laporan-kehadiran/rekap-harian?tanggal=${tanggal}&status=alpha`,
							);
						} else if (item.nama === "Tugas Luar") {
							navigate(
								`/admin/presensi/laporan-kehadiran/rekap-harian?tanggal=${tanggal}&status=perjalanan_dinas`,
							);
						} else {
							navigate(
								`/admin/presensi/laporan-kehadiran/rekap-harian?tanggal=${tanggal}&status=${convertToSlug(
									item.nama,
								)}`,
							);
						}
					}}
					className="
						cursor-pointer rounded-xl border border-[#1E5916]/30
						bg-[#F4FBF5] p-5
						flex items-center justify-between
						transition hover:shadow-md hover:border-[#1E5916]
					"
				>
					<div className="flex items-center gap-4">
						<img src={item.img} alt={item.nama} className="h-12 w-12" />
						<div>
							<p className="text-sm text-slate-500">{item.nama}</p>
							<p className="text-2xl font-semibold text-[#1E5916]">
								{item.jumlah}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function CardDashboardSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{Array.from({ length: 6 }).map((_, idx) => (
				<div
					key={idx}
					className="
						animate-pulse rounded-xl border
						p-5 flex items-center gap-4
						bg-slate-50
					"
				>
					<div className="h-14 w-14 rounded-lg bg-slate-200" />
					<div className="flex flex-col gap-2 flex-1">
						<div className="h-4 w-24 bg-slate-200 rounded" />
						<div className="h-6 w-16 bg-slate-300 rounded" />
					</div>
				</div>
			))}
		</div>
	);
}
