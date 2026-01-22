import { FaBoxOpen } from "react-icons/fa";
import { useGetProfileKontrolAkses } from "../controller";
import type { Profile } from "../model";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailKontrolAkses({ data }: { data: Profile | undefined }) {
	const { data: dataModul, loading } = useGetProfileKontrolAkses(
		data?.id || "",
	);

	// ✅ LOADING STATE
	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{Array.from({ length: 5 }).map((_, idx) => (
					<div
						key={idx}
						className="flex flex-col gap-2 rounded-md items-center justify-center min-h-50 border border-[#DFDFDF]"
					>
						<Skeleton className="w-20 h-20 rounded-md" />
						<Skeleton className="h-4 w-24" />
					</div>
				))}
			</div>
		);
	}

	// ambil modul yang aktif
	const activeModules = dataModul?.filter((item) => item?.is_active) || [];

	// ✅ EMPTY STATE
	if (!activeModules.length) {
		return (
			<div className="flex flex-col items-center justify-center py-10 text-sm text-muted-foreground border border-dashed rounded-md">
				<FaBoxOpen size={48} className="mb-2 opacity-50" />
				Tidak ada modul aktif
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
			{activeModules.map((item, idx) => (
				<div
					key={idx}
					className="flex flex-col gap-2 hover:shadow transition-shadow duration-300 rounded-md items-center justify-center min-h-50 border border-[#DFDFDF] cursor-pointer"
				>
					{item?.photo ? (
						<img
							src={item.photo}
							className="w-20 h-20 object-contain"
							alt={item.nama}
						/>
					) : (
						<FaBoxOpen size={80} color="#9EDAA0" />
					)}
					<p className="text-sm font-medium text-center">{item.nama}</p>
				</div>
			))}
		</div>
	);
}
