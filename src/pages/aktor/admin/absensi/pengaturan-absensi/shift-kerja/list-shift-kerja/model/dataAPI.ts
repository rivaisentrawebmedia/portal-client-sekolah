import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { ShiftKerja, UpdatePayload } from "./dataTypes";

export type GetShiftKerjaParams = {
	page: number;
	limit?: number;
	search?: string;
};

export const getShiftKerja = async ({
	page,
	limit,
	search,
}: GetShiftKerjaParams): Promise<PaginatedResponse<ShiftKerja>> => {
	const res = await AxiosClient.get("/presensi/shift-kerja", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};

export const getShiftKerjaByID = async ({
	id,
}: {
	id: string;
}): Promise<{ data: ShiftKerja }> => {
	const res = await AxiosClient.get(`/presensi/shift-kerja/${id}`, {});

	return res.data;
};

export async function postShiftKerja(payload: any) {
	const res = await AxiosClient.post("/presensi/shift-kerja", payload);
	return res.data;
}

export async function updateShiftKerja({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/shift-kerja/${id}`, data);
	return res.data;
}

export async function deleteShiftKerja(id: string) {
	const res = await AxiosClient.delete(`/presensi/shift-kerja/${id}`);
	return res.data;
}
