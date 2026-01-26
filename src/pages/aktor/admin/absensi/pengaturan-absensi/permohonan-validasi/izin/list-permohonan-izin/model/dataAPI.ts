import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type { PermohonanIzin, JenisIzin, UpdatePayload } from "./dataTypes";
import type { PermohonanIzinFormValues } from "./dataSchema";

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
}: GetJenisIzinParams): Promise<PaginatedResponse<JenisIzin>> => {
	const res = await AxiosClient.get("/presensi/jenis-izin", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};

export async function postPermohonanIzin(payload: PermohonanIzinFormValues) {
	const res = await AxiosClient.post("/presensi/pengajuan-izin", payload);
	return res.data;
}

export async function updatePermohonanIzin({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/pengajuan-izin/${id}`, data);
	return res.data;
}

export async function deletePermohonanIzin(id: string) {
	const res = await AxiosClient.delete(`/presensi/pengajuan-izin/${id}`);
	return res.data;
}
