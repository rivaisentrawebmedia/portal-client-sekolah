import { BasicLabel } from "@/components/common/BasicLabel";
import { JokoBusiness } from "@/assets/icons/JokoBusiness";
import { JokoMail } from "@/assets/icons/JokoMail";
import { JokoPersonPin } from "@/assets/icons/JokoPersonPin";
import { getInitials } from "@/utils/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import type { Profile } from "../model";

export function DetailProfilSuperAdmin({
	loading,
	dataProfil,
}: {
	loading: boolean;
	dataProfil: Profile | undefined;
}) {
	// ✅ LOADING STATE
	if (loading) {
		return (
			<div className="flex flex-col gap-2 md:flex-row md:gap-3 p-3 rounded-md bg-[#F6FFF5] border border-[#9EDAA0]">
				<Skeleton className="h-30 w-30 rounded-md" />

				<div className="flex flex-col gap-2 flex-1">
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-6 w-2/3" />
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/3" />
				</div>
			</div>
		);
	}

	// ✅ EMPTY STATE (jika data null)
	if (!dataProfil) {
		return (
			<div className="p-3 rounded-md bg-[#F6FFF5] border border-[#9EDAA0] text-sm text-muted-foreground">
				Data profil tidak tersedia
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 md:flex-row md:gap-3 p-3 rounded-md bg-[#F6FFF5] border border-[#9EDAA0]">
			{dataProfil?.photo ? (
				<img
					src={dataProfil.photo}
					alt={dataProfil.nama}
					className="h-30 w-30 rounded-md object-cover"
				/>
			) : (
				<div className="flex items-center justify-center h-30 w-30 rounded-md text-xl bg-primary text-white">
					{getInitials(dataProfil?.nama || "")}
				</div>
			)}

			<div className="flex flex-col gap-2 flex-1">
				<BasicLabel
					label={<JokoBusiness color="#1E5916" />}
					value={dataProfil?.nama_sekolah || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>

				<p className="text-xl font-medium">{dataProfil?.nama}</p>

				<BasicLabel
					label={<JokoPersonPin />}
					value={dataProfil?.username || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>

				<BasicLabel
					label={<JokoMail />}
					value={dataProfil?.email || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>
			</div>
		</div>
	);
}
