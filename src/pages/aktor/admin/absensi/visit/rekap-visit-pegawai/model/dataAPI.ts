import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { Visit } from "../../list-visit/model";

export type GetRekapVisitParams = {
	page: number;
	limit: number;
	search: string;
	pegawai_id: string;
	status: string;
};

export const getRekapVisitByID = async ({
	status,
	limit,
	page,
	search,
	pegawai_id,
}: GetRekapVisitParams): Promise<PaginatedResponse<Visit>> => {
	const res = await AxiosClient.get("/presensi/visit/rekap-pegawai", {
		params: {
			status,
			limit,
			page,
			search,
			pegawai_id,
		},
	});

	return res.data;
};
