import type { UseFormReturn } from "react-hook-form";
import type { BagianSurat } from "../../../../pengaturan/bagian-surat/model";
import type { ReactNode } from "react";
import { InputCommon } from "@/components/common/basic-input";

export function FormFormatSurat({
	data,
	form,
	isLoading,
}: {
	data: BagianSurat | undefined;
	form: UseFormReturn<any>;
	isLoading: boolean;
}) {
	const kodeDepan = data?.kode_depan;
	const kodeBelakang = data?.kode_belakang;
	const urutanNomor = data?.urutan_nomor;
	const perluTahun = Boolean(data?.perlu_tahun);
	const perluBulan = Boolean(data?.perlu_bulan);

	const formatSurat = () => {
		const segments: {
			key: string;
			value: ReactNode;
			order?: number;
			enabled: boolean;
		}[] = [
			{
				key: "kode_depan",
				value: (
					<InputCommon
						form={form}
						name="kode_depan"
						label="Kode Awal"
						placeholder="---"
						disabled
					/>
				),
				order: Number(data?.urutan_kode_depan),
				enabled: Boolean(kodeDepan),
			},
			{
				key: "nomor",
				value: (
					<InputCommon
						form={form}
						name="nomor_surat"
						label="Nomor Surat"
						placeholder="Nomor Surat"
						disabled={isLoading}
					/>
				),
				order: Number(urutanNomor),
				enabled: true,
			},
			{
				key: "kode_belakang",
				value: (
					<InputCommon
						form={form}
						name="kode_belakang"
						label="Kode Belakang"
						placeholder="---"
						disabled
					/>
				),
				order: Number(data?.urutan_kode_belakang),
				enabled: Boolean(kodeBelakang),
			},
			{
				key: "bulan",
				value: (
					<InputCommon
						form={form}
						name="bulan"
						label="Bulan"
						placeholder="---"
						disabled
					/>
				),
				order: Number(data?.urutan_bulan),
				enabled: perluBulan,
			},
			{
				key: "tahun",
				value: (
					<InputCommon
						form={form}
						name="tahun"
						label="Tahun"
						placeholder="---"
						disabled={isLoading}
					/>
				),
				order: Number(data?.urutan_tahun),
				enabled: perluTahun,
			},
		];

		return segments
			.filter((s) => s.enabled && !Number.isNaN(s.order))
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	};

	return (
		<>
			<div className="flex md:gap-4 w-full flex-col gap2 md:flex-row">
				{formatSurat().map((segment) => (
					<div key={segment.key} className="w-full">
						{segment.value}
					</div>
				))}
			</div>
		</>
	);
}
