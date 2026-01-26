import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { LogAktivitas } from "./dataTypes";

export type GetLogAktivitasParams = {
	page: number;
	limit?: number;
	search?: string;
	jangka_waktu?: string;
	modul_id?: string;
	user_id?: string;
};

export const getLogAktivitas = async ({
	page,
	limit,
	search,
	jangka_waktu,
	modul_id,
	user_id,
}: GetLogAktivitasParams): Promise<PaginatedResponse<LogAktivitas>> => {
	const res = await AxiosClient.get("/portal-sekolah/riwayat-aktifitas", {
		params: {
			page,
			limit,
			search: search || undefined,
			jangka_waktu,
			modul_id,
			user_id,
		},
	});

	return res.data;
};
