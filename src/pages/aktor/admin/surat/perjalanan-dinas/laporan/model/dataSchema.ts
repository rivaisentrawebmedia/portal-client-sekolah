import { z } from "zod";

export const LaporanSPPDSchema = z.object({
	tempat: z.string().min(1, "Tempat is required"),
	tanggal: z.string().min(1, "Tanggal is required"),
	perihal: z.string().min(1, "Perihal is required"),
	isi: z.string().min(1, "Isi is required"),
	dasar_pelaksanaan: z.string().min(1, "Dasar Pelaksanaan is required"),
	laporan_pelaksanaan: z
		.array(z.string())
		.min(1, "Laporan Pelaksanaan is required"),
	tindak_lanjut: z.string().min(1, "Tindak lanjut is required"),
	saran: z.string().min(1, "Saran is required"),
});

export type LaporanSPPDFormValues = z.infer<typeof LaporanSPPDSchema>;
