import { toRoman } from "@/utils/helpers";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useMemo } from "react";

dayjs.locale("id");

type Segment = {
	key: string;
	value: string;
	order: number;
	enabled: boolean;
};

export function useFormatSurat(form: any) {
	const values = form.watch();

	const segments = useMemo<Segment[]>(() => {
		// ==== NORMALISASI VALUE ====
		const kodeDepan = values?.kode_depan ?? "";
		const kodeBelakang = values?.kode_belakang ?? "";

		const urutanNomor = Number(values?.urutan_nomor ?? 0);
		const urutanKodeDepan = Number(values?.urutan_kode_depan ?? 0);
		const urutanKodeBelakang = Number(values?.urutan_kode_belakang ?? 0);
		const urutanBulan = Number(values?.urutan_bulan ?? 0);
		const urutanTahun = Number(values?.urutan_tahun ?? 0);

		const perluBulan = values?.perlu_bulan;
		const perluTahun = values?.perlu_tahun;

		const isBulanRomawi = values?.is_bulan_romawi;

		const bulan = isBulanRomawi
			? toRoman(Number(dayjs().format("MM")))
			: dayjs().format("MM");

		const tahun = dayjs().format("YYYY");

		const list: Segment[] = [
			{
				key: "kode_depan",
				value: kodeDepan || "XXX",
				order: urutanKodeDepan || 1,
				enabled: Boolean(kodeDepan),
			},
			{
				key: "nomor",
				value: "[Nomor Surat]",
				order: urutanNomor || 2,
				enabled: true,
			},
			{
				key: "kode_belakang",
				value: kodeBelakang || "XXX",
				order: urutanKodeBelakang || 3,
				enabled: Boolean(kodeBelakang),
			},
			{
				key: "bulan",
				value: bulan,
				order: urutanBulan || 4,
				enabled: perluBulan,
			},
			{
				key: "tahun",
				value: tahun,
				order: urutanTahun || 5,
				enabled: perluTahun,
			},
		];

		return list.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	}, [values]);

	return segments;
}
