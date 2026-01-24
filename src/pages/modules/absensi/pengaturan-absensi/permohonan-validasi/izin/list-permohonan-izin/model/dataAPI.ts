import AxiosClient from "@/provider/axios";
import type {
	PermohonanIzin,
	PaginatedResponse,
	PaginatedResponseByID,
	PaginatedResponseJenisIzin,
	JenisIzin,
} from "./dataTypes";

export type GetPermohonanIzinParams = {
	page: number;
	limit?: number;
	search?: string;
	status?: string;
};

export type GetJenisIzinParams = {
	page: number;
	limit?: number;
	search?: string;
};

export const getPermohonanIzin = async ({
	page,
	limit,
	search,
	status,
}: GetPermohonanIzinParams): Promise<PaginatedResponse<PermohonanIzin>> => {
	const res = await AxiosClient.get("/presensi/pengajuan-izin", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getPermohonanIzinByID = async ({
	id,
}: {
	id: String;
}): Promise<PaginatedResponseByID<PermohonanIzin>> => {
	const res = await AxiosClient.get(`/presensi/pengajuan-izin/${id}`);

	return res.data;
};

export const getJenisIzin = async ({
	page,
	limit,
	search,
}: GetJenisIzinParams): Promise<PaginatedResponseJenisIzin<JenisIzin>> => {
	const res = await AxiosClient.get("/presensi/jenis-izin", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};
