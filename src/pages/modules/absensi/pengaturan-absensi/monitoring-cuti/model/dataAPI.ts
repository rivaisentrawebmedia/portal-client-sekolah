import AxiosClient from "@/provider/axios";
import type { MonitoringCuti, PaginatedResponse } from "./dataTypes";

export type GetMonitoringCutiParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getMonitoringCuti = async ({
	page,
	limit,
	search,
	spam,
}: GetMonitoringCutiParams): Promise<PaginatedResponse<MonitoringCuti>> => {
	const res = await AxiosClient.get("/presensi/monitoring-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};
