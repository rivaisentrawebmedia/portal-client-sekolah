import { Alert, AlertTitle } from "@/components/ui/alert";
import type { KontrolAkses } from "../../../../list-user/model";
import { AlertOctagon, Check, TriangleAlert } from "lucide-react";
import { FaImage } from "react-icons/fa";
import { TableMenu } from "./TableMenu";
import { useGetKontrolAksesMenu } from "../../../../list-user/controller";
import { Skeleton } from "@/components/ui/skeleton";

export function AksesMenu({
	data,
	loading,
	modul,
}: {
	setModul: React.Dispatch<React.SetStateAction<string | undefined>>;
	modul: string | undefined;
	data: KontrolAkses[] | undefined;
	loading: boolean;
}) {
	const selected = data?.find((item) => item?.id === modul);

	const { data: menu, loading: loadingMenu } = useGetKontrolAksesMenu(
		selected?.id || "",
	);

	/* ======================
	 * 🔄 LOADING SKELETON
	 * ====================== */
	if (loading) {
		return (
			<div className="flex flex-col gap-3">
				{/* Header modul */}
				<div className="flex items-center gap-2 border border-[#DFDFDF] rounded-md px-4 py-2">
					<Skeleton className="w-6 h-6 rounded" />
					<Skeleton className="h-5 w-48" />
				</div>

				{/* Alert */}
				<div className="flex items-center gap-2 border rounded-full px-4 py-2">
					<Skeleton className="h-6 w-6 rounded-full" />
					<Skeleton className="h-4 w-[320px]" />
				</div>
			</div>
		);
	}

	return (
		<>
			{/* ======================
			 * 📦 HEADER MODUL
			 * ====================== */}
			{modul && selected && (
				<div className="flex items-center gap-2 border border-[#1E5916] text-[#1E5916] rounded-md px-4 py-2">
					{selected?.photo ? (
						<img
							src={selected?.photo}
							alt={selected?.nama}
							className="w-6 h-6"
						/>
					) : (
						<FaImage size={24} color="#021a00" />
					)}
					<p className="font-normal text-lg">{selected?.nama}</p>
				</div>
			)}

			{/* ======================
			 * ℹ️ ALERT STATUS
			 * ====================== */}
			{modul && selected?.is_active === true ? (
				<Alert className="bg-sky-50 border-sky-500 text-sky-600 rounded-full px-4 py-2">
					<Check size={24} />
					<AlertTitle className="font-normal">
						Modul sudah aktif. Silahkan untuk mengatur akses user untuk aplikasi
						ini.
					</AlertTitle>
				</Alert>
			) : modul && selected?.is_active === false ? (
				<Alert className="bg-rose-50 border-rose-500 text-rose-600 rounded-full px-4 py-2">
					<TriangleAlert size={24} />
					<AlertTitle className="font-normal">
						Modul belum diaktifkan. Silahkan aktifkan terlebih dahulu agar dapat
						mengatur akses user.
					</AlertTitle>
				</Alert>
			) : (
				<Alert className="bg-amber-50 border-amber-500 text-amber-600 rounded-full px-4 py-2">
					<AlertOctagon size={24} />
					<AlertTitle className="font-normal">
						Belum memilih modul. Silahkan pilih modul untuk di atur hak aksesnya
					</AlertTitle>
				</Alert>
			)}

			{modul && selected?.is_active === true && (
				<TableMenu data={menu || []} loading={loadingMenu} />
			)}
		</>
	);
}
