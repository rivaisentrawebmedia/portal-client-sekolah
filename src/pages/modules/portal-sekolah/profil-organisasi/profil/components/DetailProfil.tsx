import { Skeleton } from "@/components/ui/skeleton";
import type { ProfilOrganisasi } from "../model";
import { getInitials } from "@/utils/helpers";

export function DetailProfil({
	data,
	loading,
}: {
	data: ProfilOrganisasi | undefined;
	loading: boolean;
}) {
	return (
		<>
			{/* HEADER */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center">
				<p className="text-nowrap text-[#1E5916]">Profil</p>
				<hr className="border-t w-full" />
			</div>

			{/* LOADING STATE */}
			{loading ? (
				<div className="flex flex-col gap-4">
					{Array.from({ length: 4 }).map((_, idx) => (
						<div key={idx} className="flex flex-col gap-2 md:flex-row">
							<Skeleton className="h-4 w-full md:w-1/5" />
							<Skeleton className="h-4 w-full md:flex-1" />
						</div>
					))}
				</div>
			) : (
				<>
					<div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-center">
						{data?.photo_sekolah ? (
							<img
								src={data?.photo_sekolah}
								alt={data?.nama_sekolah}
								className="w-30 h-30"
							/>
						) : (
							<div className="flex items-center justify-center w-30 h-30 bg-primary text-white">
								{getInitials(data?.nama_sekolah || "")}
							</div>
						)}
						<div className="flex flex-col gap-1 flex-1">
							<p className="text-[#888] text-sm">Nama Sekolah</p>
							<p className="text-xl text-primary font-medium">
								{data?.nama_sekolah}
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
}
