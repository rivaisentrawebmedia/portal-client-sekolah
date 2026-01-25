import { BasicLabel } from "@/components/common/BasicLabel";
import type { PengaturanAbsensi } from "../model";

function SkeletonLabel() {
	return (
		<div className="flex flex-col gap-2">
			<div className="h-4 w-32 bg-muted animate-pulse rounded" />
			<div className="h-5 w-20 bg-muted animate-pulse rounded" />
		</div>
	);
}

export function LabelPengaturanAbsensi({
	data,
	loading,
}: {
	data: PengaturanAbsensi | undefined;
	loading: boolean;
}) {
	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<SkeletonLabel />
				<SkeletonLabel />
				<SkeletonLabel />
				<SkeletonLabel />
				<SkeletonLabel />
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<BasicLabel
				label="Wajib Foto"
				value={data?.is_wajib_foto ? "Ya" : "Tidak"}
			/>
			<BasicLabel
				label="Wajib Realisasi"
				value={data?.is_wajib_realisasi_kegiatan ? "Ya" : "Tidak"}
			/>
			<BasicLabel
				label="Wajib Isi Rencana Kegiatan"
				value={data?.is_wajib_isi_rencana_kegiatan ? "Ya" : "Tidak"}
			/>
			<BasicLabel
				label="Wajib Presensi Di Lokasi"
				value={data?.is_wajib_presensi_dilokasi ? "Ya" : "Tidak"}
			/>
			<BasicLabel label="Cuti Tahunan" value={data?.cuti_tahunan || "-"} />
		</div>
	);
}
