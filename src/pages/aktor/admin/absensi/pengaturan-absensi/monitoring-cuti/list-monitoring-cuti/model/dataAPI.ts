import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { MonitoringCuti } from "./dataTypes";
import type { PermohonanCuti } from "../../../permohonan-validasi/cuti/layout/model";

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
}: GetMonitoringCutiParamsByID): Promise<PaginatedResponse<PermohonanCuti>> => {
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
