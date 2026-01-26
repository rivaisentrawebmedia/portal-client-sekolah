import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { PeriodeCuti, UpdatePayload } from "./dataTypes";
import type { PeriodeCutiFormValues } from "./dataSchema";

export type GetPeriodeCutiParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getPeriodeCuti = async ({
	page,
	limit,
	search,
	spam,
}: GetPeriodeCutiParams): Promise<PaginatedResponse<PeriodeCuti>> => {
	const res = await AxiosClient.get("/presensi/periode-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};

export async function postPeriodeCuti(payload: PeriodeCutiFormValues) {
	const res = await AxiosClient.post("/presensi/periode-cuti", payload);
	return res.data;
}

export async function updatePeriodeCuti({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/periode-cuti/${id}`, data);
	return res.data;
}

export async function deletePeriodeCuti(id: string) {
	const res = await AxiosClient.delete(`/presensi/periode-cuti/${id}`);
	return res.data;
}
