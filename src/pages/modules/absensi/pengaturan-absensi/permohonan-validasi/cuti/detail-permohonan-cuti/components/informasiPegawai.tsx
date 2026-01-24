import { useGetManajemenUserByID } from "@/pages/modules/portal-sekolah/manajemen-user/list-user/controller";
import { BasicLabel } from "@/components/common/BasicLabel";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { getInitials } from "@/utils/helpers";

function InformasiPegawaiSkeleton() {
	return (
		<div className="flex flex-col gap-4 md:flex-row border border-primary bg-white p-4 rounded-md">
			{/* Foto */}
			<Skeleton className="w-40 h-40 rounded-md" />

			{/* Data */}
			<div className="grid grid-cols-1 flex-1 md:grid-cols-3 gap-2">
				{Array.from({ length: 7 }).map((_, i) => (
					<div key={i} className="space-y-1">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-5 w-full" />
					</div>
				))}
			</div>
		</div>
	);
}

export function InformasiPegawai() {
	const { data, loading } = useGetManajemenUserByID();

	if (loading) {
		return <InformasiPegawaiSkeleton />;
	}

	return (
		<div className="flex flex-col gap-4 md:flex-row border border-primary bg-[#F4F7F4] p-4 rounded-md">
			{data?.photo ? (
				<img
					src={data.photo}
					className="h-40 w-40 object-cover rounded-md"
					alt={data.nama}
				/>
			) : (
				<div className="flex items-center justify-center w-40 h-40 bg-primary text-white text-2xl rounded-md">
					{getInitials(data?.nama || "")}
				</div>
			)}

			<div className="grid grid-cols-1 flex-1 md:grid-cols-3 gap-2">
				<BasicLabel label="NIP" value={data?.nip || "-"} />
				<BasicLabel label="Nama" value={data?.nama || "-"} />
				<BasicLabel label="Tempat Lahir" value={data?.tempat_lahir || "-"} />
				<BasicLabel
					label="Tanggal Lahir"
					value={
						data?.tanggal_lahir
							? dayjs(data.tanggal_lahir).locale("id").format("DD-MM-YYYY")
							: "-"
					}
				/>
				<BasicLabel
					label="Pangkat Golongan"
					value={data?.pangkat_golongan || "-"}
				/>
				<BasicLabel label="Email" value={data?.email || "-"} />
				<BasicLabel label="No. HP" value={data?.no_telp || "-"} />
			</div>
		</div>
	);
}
