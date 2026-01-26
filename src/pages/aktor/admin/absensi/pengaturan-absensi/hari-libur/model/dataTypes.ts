import type { HariLiburFormValues } from "./dataSchema";

export type HariLibur = {
	id: string;
	created_at: string;
	nama: string;
	tanggal_mulai: string;
	tanggal_akhir: string | null;
};

export type UpdatePayload = {
	id: string;
	data: HariLiburFormValues;
};
