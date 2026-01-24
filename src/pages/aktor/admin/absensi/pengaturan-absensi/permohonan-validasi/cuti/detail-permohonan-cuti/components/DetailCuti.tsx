import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { PermohonanCuti } from "../../layout/model";
import { Pencil } from "lucide-react";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailCuti({
	detail,
	loading,
}: {
	detail: PermohonanCuti | undefined;
	loading: boolean;
}) {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	if (loading) {
		return <DetailCutiSkeleton />;
	}

	return (
		<>
			<div className="flex flex-col gap-4 rounded-md border border-primary bg-[#F4F7F4] p-4">
				<div className="flex flex-col gap-2 md:flex-row md:justify-between">
					<p className="text-lg text-primary">Detail Cuti</p>
					<div className="flex items-center gap-2">
						<p>No. Urut Cuti: {detail?.no_urut || "-"}</p>
						{(detail?.status === "diajukan" || detail?.status === "draft") && (
							<button
								type="button"
								onClick={() => {
									navigate(
										`/admin/presensi/pengaturan-absensi/permohonan-validasi/cuti/${detail?.id}/edit?${params?.toString()}`,
									);
								}}
								className="flex items-center gap-2 rounded-md border border-primary px-3 py-1.5 text-primary"
							>
								<Pencil size={14} />
								<p>Edit Data</p>
							</button>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					<BasicLabel label="Jenis Cuti" value={detail?.jenis_cuti || "-"} />
					<BasicLabel label="Sisa Cuti" value={detail?.sisa_cuti || "-"} />
					<BasicLabel
						label="Tanggal Cuti"
						value={`${detail?.mulai ? dayjs(detail?.mulai).locale("id").format("DD-MM-YYYY") : ""} s/d ${detail?.selesai ? dayjs(detail?.selesai).locale("id").format("DD-MM-YYYY") : ""}`}
					/>
					<BasicLabel label="Jumlah Cuti" value={detail?.jumlah_cuti || "-"} />
					<BasicLabel label="Alasan Cuti" value={detail?.alasan_cuti || "-"} />
					<BasicLabel
						label="Alamat Selama Cuti"
						value={detail?.alamat_selama_cuti || "-"}
					/>
					<BasicLabel
						label="No. Telepon yang Bisa Dihubungi Selama Cuti"
						value={detail?.no_telp || "-"}
					/>
					{detail?.file_cuti && (
						<Link
							to={detail?.file_cuti}
							target="_blank"
							rel="noopener noreferrer"
							className={"flex gap-1 flex-col"}
						>
							<p className="text-sm text-[#888] md:min-w-[140px]">File Cuti</p>

							<div className="text-sm flex items-center gap-2 text-gray-900 break-words">
								<p className="line-clamp-1 underline text-primary">
									{detail?.file_cuti}
								</p>
							</div>
						</Link>
					)}
				</div>
			</div>
		</>
	);
}

function DetailCutiSkeleton() {
	return (
		<div className="flex flex-col gap-4 rounded-md border border-primary bg-white p-4">
			{/* Header */}
			<div className="flex flex-col gap-2 md:flex-row md:justify-between">
				<Skeleton className="h-6 w-32" />
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-9 w-28 rounded-md" />
				</div>
			</div>

			{/* Content */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="space-y-1">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-5 w-full" />
					</div>
				))}
			</div>
		</div>
	);
}
