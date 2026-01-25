import AxiosClient from "@/provider/axios";
import type { ShiftKerja, PaginatedResponse } from "./dataTypes";

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
