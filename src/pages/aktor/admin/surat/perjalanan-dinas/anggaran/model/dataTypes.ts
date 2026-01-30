import type { AnggaranFormValues } from "./dataSchema";

export type Anggaran = {
	id: string;

	created_at: string;

	updated_at: string;

	created_by_id: string | null;
	updated_by_id: string | null;
	deleted_at: string | null;
	deleted_by_id: string | null;
	sekolah_id: string;

	nama: string;

	tahun: string;

	jumlah: number;
};

export type UpdatePayload = {
	id: string;
	data: AnggaranFormValues;
};
