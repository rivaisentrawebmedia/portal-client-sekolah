import type { KelompokFormValues } from "./dataSchema";

export type Kelompok = {
	id: string;
	created_at: string;
	updated_at: string;
	nama: string;
};

export type UpdatePayload = {
	id: string;
	data: KelompokFormValues;
};
