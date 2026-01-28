import dayjs from "dayjs";
import { useMemo } from "react";
import type { BagianSurat } from "../model";
import { toRoman } from "@/utils/helpers";

export function FormatSurat({ data }: { data: BagianSurat }) {
	const segments = useMemo(() => {
		const list = [
			{
				key: "kode_depan",
				value: data?.kode_depan || "XXX",
				order: Number(data?.urutan_kode_depan),
				enabled: Boolean(data?.kode_depan),
			},
			{
				key: "nomor",
				value: "Nomor Surat",
				order: Number(data?.urutan_nomor),
				enabled: true,
				highlight: true,
			},
			{
				key: "kode_belakang",
				value: data?.kode_belakang || "XXX",
				order: Number(data?.urutan_kode_belakang),
				enabled: Boolean(data?.kode_belakang),
			},
			{
				key: "bulan",
				value: data?.is_bulan_romawi
					? toRoman(Number(dayjs().format("MM")))
					: dayjs().format("MM"),
				order: Number(data?.urutan_bulan),
				enabled: data?.perlu_bulan,
			},
			{
				key: "tahun",
				value: dayjs().format("YYYY"),
				order: Number(data?.urutan_tahun),
				enabled: data?.perlu_tahun,
			},
		];

		return list
			.filter((s) => s.enabled && !Number.isNaN(s.order))
			.sort((a, b) => a.order - b.order);
	}, [data]);

	return (
		<div className="inline-flex flex-wrap items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm dark:bg-zinc-900">
			{segments.map((segment, idx) => (
				<div key={segment.key} className="flex items-center gap-2">
					<span
						className={
							segment.highlight
								? "text-primary font-semibold"
								: "text-zinc-700 dark:text-zinc-200"
						}
					>
						{segment.value}
					</span>

					{idx < segments.length - 1 && (
						<span className="text-zinc-400">/</span>
					)}
				</div>
			))}
		</div>
	);
}
