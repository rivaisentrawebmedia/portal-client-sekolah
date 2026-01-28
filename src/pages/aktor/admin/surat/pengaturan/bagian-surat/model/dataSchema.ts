import { z } from "zod";

export const BagianSuratSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	keterangan: z.string().optional().nullable().nullish(),
	kode_depan: z.string().min(1, "Kode depan is required"),
	urutan_kode_depan: z.string().min(1, "Urutan kode depan is required"),
	kode_belakang: z.string().min(1, "Kode belakang is required"),
	urutan_kode_belakang: z.string().min(1, "Urutan kode belakang is required"),
	perlu_bulan: z.boolean().optional().nullable().nullish(),
	urutan_bulan: z.string().min(1, "Urutan bulan is required"),
	perlu_tahun: z.boolean().optional().nullable().nullish(),
	urutan_tahun: z.string().min(1, "Urutan tahun is required"),
	urutan_nomor: z.string().min(1, "Urutan nomor is required"),
	format_nomor_surat: z.string().optional().nullable().nullish(),
	is_bulan_romawi: z.boolean().optional().nullable().nullish(),
});

export type BagianSuratFormValues = z.infer<typeof BagianSuratSchema>;
