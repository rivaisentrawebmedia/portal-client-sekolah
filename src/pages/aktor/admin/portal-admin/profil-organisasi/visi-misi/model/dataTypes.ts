import type { VisiMisiFormValues } from "./dataSchema";

export type VisiMisi = {
	visi: string;
	misi: string;
	tujuan: string;
};

export type UpdatePayload = {
	data: VisiMisiFormValues;
};
