import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { RekapVisit, Visit } from "./dataTypes";

export type GetVisitParams = {
	page: number;
	limit: number;
	search: string;
	status: string;
};

export type GetRekapVisitParams = {
	page: number;
	limit: number;
	search: string;
	tahun: string;
};

export const getVisit = async ({
	status,
	limit,
	page,
	search,
}: GetVisitParams): Promise<PaginatedResponse<Visit>> => {
	const res = await AxiosClient.get("/presensi/visit/rekap", {
		params: {
			status,
			limit,
			page,
			search,
		},
	});

	return res.data;
};

export const getRekapVisit = async ({
	limit,
	page,
	search,
	tahun,
}: GetRekapVisitParams): Promise<PaginatedResponse<RekapVisit>> => {
	const res = await AxiosClient.get("/presensi/visit", {
		params: {
			status,
			limit,
			page,
			search,
			tahun,
		},
	});

	return res.data;
};

export async function deleteVisit(id: string) {
	const res = await AxiosClient.delete(`/presensi/visit/${id}`);
	return res.data;
}
