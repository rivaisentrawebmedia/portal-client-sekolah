import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { convertSlugToText, convertToSlug } from "@/utils/helpers";
import type { MetaPagination } from "@/components/common/pagination";
import type { Dashboard } from "../../../dashboard/model";

export function TabCuti({
	statusParams,
	listStatus,
	meta,
	dashboard,
}: {
	statusParams: string;
	listStatus: string[];
	meta: MetaPagination | undefined;
	dashboard: Dashboard | undefined;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<>
			<div className="flex overflow-x-auto">
				{listStatus.map((item, idx) => {
					const active = item === statusParams;
					const total =
						idx === 0
							? meta?.hadir
							: idx === 1
								? meta?.sakit
								: idx === 2
									? meta?.izin
									: idx === 3
										? meta?.cuti
										: idx === 4
											? meta?.alpha
											: idx === 5
												? meta?.perjalanan_dinas
												: dashboard?.jumlah_pegawai;
					return (
						<div
							key={item}
							onClick={() => {
								const p = new URLSearchParams(searchParams);
								p.set("status", convertToSlug(item));
								setSearchParams(p);
							}}
							className={clsx(
								"cursor-pointer w-full rounded-t-md duration-300 justify-center px-4 border py-2 transition-colors flex items-center gap-2",
							)}
							style={{
								borderLeftColor: active ? "#1e5916" : "transparent",
								borderRightColor: active ? "#1e5916" : "transparent",
								borderBottomColor: active ? "transparent" : "#1e5916",
								borderTopColor: active ? "#1e5916" : "transparent",
							}}
						>
							<p>{convertSlugToText(item)}</p>
							<p className="rounded-full h-5 w-5 bg-[#cd2738] text-xs flex items-center justify-center text-white">
								{total}
							</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
