import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type { PermohonanCuti, JenisCuti, UpdatePayload } from "./dataTypes";
import type { PermohonanCutiFormValues } from "./dataSchema";

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
}: GetJenisCutiParams): Promise<PaginatedResponse<JenisCuti>> => {
	const res = await AxiosClient.get("/presensi/jenis-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};

export async function postPermohonanCuti(payload: PermohonanCutiFormValues) {
	const res = await AxiosClient.post("/presensi/pengajuan-cuti", payload);
	return res.data;
}

export async function updatePermohonanCuti({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/pengajuan-cuti/${id}`, data);
	return res.data;
}

export async function deletePermohonanCuti(id: string) {
	const res = await AxiosClient.delete(`/presensi/pengajuan-cuti/${id}`);
	return res.data;
}
