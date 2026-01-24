import { BasicLabel } from "@/components/common/BasicLabel";
import type { ProfilOrganisasi } from "../model";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailAlamatSekolah({
	data,
	loading,
}: {
	data: ProfilOrganisasi | undefined;
	loading: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-4 md:flex-row md:items-center ">
				<p className="text-nowrap text-[#1E5916]">Alamat Sekolah</p>
				<hr className="border-t w-full" />
			</div>

			{loading ? (
				<div className="flex flex-col gap-4">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div key={idx} className="flex flex-col gap-2 md:flex-row">
							<Skeleton className="h-4 w-full md:w-1/5" />
							<Skeleton className="h-4 w-full md:flex-1" />
						</div>
					))}
				</div>
			) : (
				<>
					<BasicLabel
						label="Provinsi"
						value={data?.provinsi || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>

					<BasicLabel
						label="Kabupaten/Kota"
						value={data?.kabupaten || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="Kecamatan"
						value={data?.kecamatan || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="Kelurahan/Desa"
						value={data?.desa || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="Kode Wilayah"
						value={data?.kode_wilayah || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
					<BasicLabel
						label="Alamat"
						value={data?.alamat_sekolah || "-"}
						labelClassName="w-full md:w-1/5"
						className="flex flex-col gap-2 md:flex-row"
					/>
				</>
			)}
		</>
	);
}
