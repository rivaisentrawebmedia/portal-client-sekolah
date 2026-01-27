import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { convertSlugToText, convertToSlug } from "@/utils/helpers";
import type { MetaPagination } from "@/components/common/pagination";

export function TabCuti({
	statusParams,
	listStatus,
	meta,
	isRekap,
}: {
	statusParams: string;
	listStatus: string[];
	meta: MetaPagination | undefined;
	isRekap?: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const bowo = statusParams === "rekap-visit";

	return (
		<>
			<div className="flex overflow-x-auto">
				{listStatus.map((item, idx) => {
					const active = item === statusParams;
					const total =
						idx === 0
							? meta?.diajukan
							: idx === 1
								? meta?.disetujui
								: idx === 2
									? meta?.ditolak
									: 0;
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
								{total || 0}
							</p>
						</div>
					);
				})}
				{isRekap && (
					<div
						onClick={() => {
							const p = new URLSearchParams(searchParams);
							p.set("status", "rekap-visit");
							setSearchParams(p);
						}}
						className={clsx(
							"cursor-pointer w-full rounded-t-md duration-300 justify-center px-4 border py-2 transition-colors flex items-center gap-2",
						)}
						style={{
							borderLeftColor: bowo ? "#1e5916" : "transparent",
							borderRightColor: bowo ? "#1e5916" : "transparent",
							borderBottomColor: bowo ? "transparent" : "#1e5916",
							borderTopColor: bowo ? "#1e5916" : "transparent",
						}}
					>
						<p>Rekap Visit</p>
					</div>
				)}
			</div>
		</>
	);
}
