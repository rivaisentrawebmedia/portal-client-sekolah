import type { PeriodeCutiFormValues } from "./dataSchema";

export type PeriodeCuti = {
	id: string;
	kode: string;
	nama: string;
	mulai: string;
	akhir: string;
};

export type UpdatePayload = {
	id: string;
	data: PeriodeCutiFormValues;
};
