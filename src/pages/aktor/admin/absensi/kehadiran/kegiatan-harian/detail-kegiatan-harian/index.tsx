import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { useGetKegiatanHarianByID } from "../list-kegiatan-harian/controller";
import { usePathname } from "@/utils/usePathname";
import { FileX, ImageOff, Pencil } from "lucide-react";
import { InformasiPegawai } from "../../../pengaturan-absensi/permohonan-validasi/cuti/detail-permohonan-cuti/components";
import { BasicLabel } from "@/components/common/BasicLabel";
import { convertFromSnakeCase } from "@/utils/helpers";
import dayjs from "dayjs";
import { JokoPDF } from "@/assets/icons/JokoPDF";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export default function DetailKegiatanHarianiPage() {
	const { fivethPathname, seventhPathname } = usePathname();
	const [searchParams] = useSearchParams();

	const { data: detail, loading } = useGetKegiatanHarianByID();

	if (loading) {
		return <SkeletonDetailKegiatanHarian />;
	}

	if (!detail) {
		return <EmptyDetailKegiatan />;
	}

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
							label: "Kegiatan Harian",
							to: `/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian?${searchParams.toString()}`,
						},
						{
							label: "Detail Kegiatan Harian",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">
						Detail Kegiatan Harian
					</p>
					<Link
						to={`/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian/${seventhPathname}/edit?${searchParams.toString()}`}
						className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary text-primary"
					>
						<Pencil size={14} />
						Edit Data
					</Link>
				</div>

				<InformasiPegawai />

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<p className="font-medium text-primary">Informasi Kegiatan</p>
					<div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
						<BasicLabel
							label="Tanggal Kehadiran"
							value={
								detail?.tanggal
									? dayjs(detail?.tanggal).locale("id").format("DD MMMM YYYY")
									: "-"
							}
						/>
						<BasicLabel
							label="Jam Masuk"
							value={detail?.jam_keluar?.slice(0, 5) || "-"}
						/>
						<BasicLabel
							label="Jam Pulang"
							value={detail?.jam_keluar?.slice(0, 5) || "-"}
						/>
						<BasicLabel label="Pekerjaan" value={detail?.pekerjaan || "-"} />
						<BasicLabel
							label="Status"
							value={convertFromSnakeCase(detail?.status || "-")}
						/>
						<BasicLabel
							label="Valid"
							value={detail?.valid ? "Valid" : "Tidak Valid"}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<p className="font-medium text-primary">Lampiran Gambar</p>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{detail?.lampiran_gambar?.length > 0 ? (
							detail?.lampiran_gambar?.map((item, idx) => {
								return (
									<div
										key={idx}
										className="flex min-h-60 w-full flex-col items-center justify-center rounded-md border bg-white font-sans"
									>
										<img
											src={item?.id}
											alt={item?.label}
											className="h-full w-full rounded-2xl object-cover"
										/>
									</div>
								);
							})
						) : (
							<EmptyLampiranGambar />
						)}
					</div>
				</div>

				<div className="flex flex-col gap-4 border border-primary bg-white p-4 rounded-md">
					<p className="font-medium text-primary">Lampiran Dokumen</p>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{detail?.lampiran_dokumen?.length > 0 ? (
							detail?.lampiran_dokumen?.map((item, idx) => {
								return (
									<div
										key={idx}
										className="flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-md border bg-white font-sans"
									>
										<div className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-md border bg-white font-sans">
											<JokoPDF size={26} />

											<Link
												to={item?.id}
												target="_blank"
												rel="noopener noreferrer"
												className="flex flex-col "
											>
												<p className="text-center underline text-primary">
													{item?.label}
												</p>
											</Link>
										</div>
									</div>
								);
							})
						) : (
							<EmptyLampiranDokumen />
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function SkeletonDetailKegiatanHarian() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<Skeleton className="h-6 w-1/3" />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton key={i} className="h-14 w-full" />
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={i} className="h-60 w-full" />
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Skeleton key={i} className="h-32 w-full" />
				))}
			</div>
		</div>
	);
}

function EmptyDetailKegiatan() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>Data tidak ditemukan</EmptyTitle>
				<EmptyDescription>
					Detail kegiatan harian tidak tersedia atau telah dihapus.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

function EmptyLampiranGambar() {
	return (
		<Empty className="border-none p-4 col-span-1 md:col-span-4">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ImageOff />
				</EmptyMedia>
				<EmptyTitle>Tidak ada gambar</EmptyTitle>
				<EmptyDescription>
					Lampiran gambar belum tersedia untuk kegiatan ini.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

export function EmptyLampiranDokumen() {
	return (
		<Empty className="border-none p-4 col-span-1 md:col-span-4">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FileX />
				</EmptyMedia>
				<EmptyTitle>Tidak ada dokumen</EmptyTitle>
				<EmptyDescription>Lampiran dokumen belum diunggah.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
