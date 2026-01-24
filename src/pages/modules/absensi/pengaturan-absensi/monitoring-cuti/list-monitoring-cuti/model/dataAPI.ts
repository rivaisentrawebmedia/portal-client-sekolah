import AxiosClient from "@/provider/axios";
import type {
	MonitoringCuti,
	MonitoringCutiByID,
	PaginatedResponse,
	PaginatedResponseByID,
} from "./dataTypes";

export type GetMonitoringCutiParams = {
	periode_cuti_id: string; // wajib
	page: number;
	limit?: number;
	search?: string;
};

export type GetMonitoringCutiParamsByID = {
	periode_cuti_id: string; // wajib
	pegawai_id: string; // wajib
	status: string;
	page: number;
	limit?: number;
	search?: string;
};

export const getMonitoringCuti = async ({
	page,
	limit,
	search,
	periode_cuti_id,
}: GetMonitoringCutiParams): Promise<PaginatedResponse<MonitoringCuti>> => {
	const res = await AxiosClient.get("/presensi/monitoring-cuti", {
		params: {
			page,
			limit,
			search: search || undefined,
			periode_cuti_id,
		},
	});

	return res.data;
};

export const getMonitoringCutiByID = async ({
	page,
	limit,
	search,
	periode_cuti_id,
	pegawai_id,
	status,
}: GetMonitoringCutiParamsByID): Promise<
	PaginatedResponseByID<MonitoringCutiByID>
> => {
	const res = await AxiosClient.get("/presensi/monitoring-cuti-detail", {
		params: {
			page,
			limit,
			search: search || undefined,
			periode_cuti_id,
			pegawai_id,
			status,
		},
	});

	return res.data;
};
