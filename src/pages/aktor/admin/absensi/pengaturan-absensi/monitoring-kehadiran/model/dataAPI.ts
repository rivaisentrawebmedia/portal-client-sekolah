import AxiosClient from "@/provider/axios";
import type { MonitoringKehadiran, PaginatedResponse } from "./dataTypes";

export type GetMonitoringKehadiranParams = {
	tanggal?: string;
	status?: string;
	page: number;
	limit?: number;
	search?: string;
};

export const getMonitoringKehadiran = async ({
	page,
	limit,
	search,
	status,
	tanggal,
}: GetMonitoringKehadiranParams): Promise<
	PaginatedResponse<MonitoringKehadiran>
> => {
	const res = await AxiosClient.get("/presensi/monitoring-kehadiran", {
		params: {
			page,
			limit,
			search: search || undefined,
			tanggal,
			status,
		},
	});

	return res.data;
};
