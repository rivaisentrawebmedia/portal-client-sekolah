import AxiosClient from "@/provider/axios";
import type {
	PermohonanCuti,
	PaginatedResponse,
	PaginatedResponseByID,
	PaginatedResponseJenisCuti,
	JenisCuti,
} from "./dataTypes";

export type GetPermohonanCutiParams = {
	page: number;
	limit?: number;
	search?: string;
	status?: string;
};

export type GetJenisCutiParams = {
	page: number;
	limit?: number;
	search?: string;
};

export const getPermohonanCuti = async ({
	page,
	limit,
	search,
	status,
}: GetPermohonanCutiParams): Promise<PaginatedResponse<PermohonanCuti>> => {
	const res = await AxiosClient.get("/presensi/pengajuan-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getPermohonanCutiByID = async ({
	id,
}: {
	id: String;
}): Promise<PaginatedResponseByID<PermohonanCuti>> => {
	const res = await AxiosClient.get(`/presensi/pengajuan-cuti/${id}`);

	return res.data;
};

export const getJenisCuti = async ({
	page,
	limit,
	search,
}: GetJenisCutiParams): Promise<PaginatedResponseJenisCuti<JenisCuti>> => {
	const res = await AxiosClient.get("/presensi/jenis-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};
