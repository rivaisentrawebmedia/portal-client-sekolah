import AxiosClient from "@/provider/axios";
import type { PeriodeCuti, PaginatedResponse } from "./dataTypes";

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
