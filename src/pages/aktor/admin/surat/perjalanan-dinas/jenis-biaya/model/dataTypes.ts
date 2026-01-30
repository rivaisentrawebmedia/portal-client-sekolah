import type { JenisBiayaFormValues } from "./dataSchema";

export type JenisBiaya = {
	id: string;
	created_at: string;
	updated_at: string;
	created_by_id: string | null;
	updated_by_id: string | null;
	deleted_at: string | null;
	deleted_by_id: string | null;
	sekolah_id: string;
	nama: string;
	kode: string;
};

export type UpdatePayload = {
	id: string;
	data: JenisBiayaFormValues;
};
