import { BasicLabel } from "@/components/common/BasicLabel";
import { JokoBusiness } from "@/assets/icons/JokoBusiness";
import { JokoMail } from "@/assets/icons/JokoMail";
import { JokoPersonPin } from "@/assets/icons/JokoPersonPin";
import { getInitials } from "@/utils/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import type { ManajemenUserByID } from "../../manajemen-user/list-user/model";
import { JokoPhone } from "@/assets/icons/JokoPhone";
import type { Profile } from "../model";

export function DetailProfil({
	data,
	loading,
	dataProfil,
}: {
	data: ManajemenUserByID | undefined;
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
	if (!data) {
		return (
			<div className="p-3 rounded-md bg-[#F6FFF5] border border-[#9EDAA0] text-sm text-muted-foreground">
				Data profil tidak tersedia
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 md:flex-row md:gap-3 p-3 rounded-md bg-[#F6FFF5] border border-[#9EDAA0]">
			{data.photo ? (
				<img
					src={data.photo}
					alt={data.nama}
					className="h-40 w-40 rounded-md object-cover"
				/>
			) : (
				<div className="flex items-center justify-center h-40 w-40 rounded-md text-xl bg-primary text-white">
					{getInitials(data.nama)}
				</div>
			)}

			<div className="flex flex-col gap-2 flex-1">
				<BasicLabel
					label={<JokoBusiness color="#1E5916" />}
					value={dataProfil?.nama_sekolah || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>

				<p className="text-xl font-medium">{data?.nama}</p>

				<BasicLabel
					label={<JokoPersonPin />}
					value={data?.pangkat_golongan || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>

				<BasicLabel
					label={<JokoMail />}
					value={data?.email || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>

				<BasicLabel
					label={<JokoPhone />}
					value={data?.no_telp || "-"}
					className="flex flex-row gap-2"
					labelClassName="md:min-w-fit"
				/>
			</div>
		</div>
	);
}
