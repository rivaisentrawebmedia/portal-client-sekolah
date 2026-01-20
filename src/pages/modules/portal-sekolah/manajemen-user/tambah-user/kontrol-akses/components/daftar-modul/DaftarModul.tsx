import { FaImage } from "react-icons/fa";
import { ToggleStatusClient } from "./ToggleStatus";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import type { KontrolAkses } from "../../../../list-user/model";

export function DaftarModul({
	setModul,
	modul,
	data,
	loading,
}: {
	setModul: React.Dispatch<React.SetStateAction<string | undefined>>;
	modul: string | undefined;
	data: KontrolAkses[] | undefined;
	loading: boolean;
}) {
	return (
		<div className="flex flex-col gap-2">
			{/* 🔄 LOADING */}
			{loading &&
				Array.from({ length: 4 }).map((_, idx) => (
					<ModulItemSkeleton key={idx} />
				))}

			{/* 📭 EMPTY */}
			{!loading && (!data || data.length === 0) && (
				<Empty className="border border-dashed">
					<EmptyHeader>
						<EmptyTitle>Modul tidak tersedia</EmptyTitle>
						<EmptyDescription>
							Belum ada modul yang bisa dikonfigurasi untuk user ini.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}

			{/* 📄 DATA */}
			{!loading &&
				data?.map((item) => {
					const isActive = modul === item.id;

					return (
						<div
							key={item.id}
							onClick={() => setModul(item.id)}
							className={clsx(
								"flex flex-col gap-2 p-3 border rounded-md cursor-pointer transition-colors duration-300",
								{
									"border-[#1E5916] bg-[#F6FFF5]": isActive,
									"border-[#DFDFDF]": !isActive,
								},
							)}
						>
							<div className="flex items-center gap-2">
								{item.photo ? (
									<img src={item.photo} alt={item.nama} className="w-6 h-6" />
								) : (
									<FaImage size={24} color="#021a00" />
								)}
								<p className="font-medium text-[#444444]">{item.nama || "-"}</p>
							</div>

							<ToggleStatusClient detail={item} />
						</div>
					);
				})}
		</div>
	);
}

function ModulItemSkeleton() {
	return (
		<div className="flex flex-col gap-2 p-3 border border-[#DFDFDF] rounded-md">
			<div className="flex items-center gap-2">
				<Skeleton className="w-6 h-6 rounded-md" />
				<Skeleton className="h-4 w-32" />
			</div>
			<Skeleton className="h-8 w-24" />
		</div>
	);
}
