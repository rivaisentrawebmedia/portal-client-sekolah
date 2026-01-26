import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { RekapHarian } from "./dataTypes";

export type GetRekapHarianParams = {
	tanggal: string;
	status: string;
};

export const getRekapHarian = async ({
	status,
	tanggal,
}: GetRekapHarianParams): Promise<PaginatedResponse<RekapHarian>> => {
	const res = await AxiosClient.get("/presensi/laporan-hari-ini-detail", {
		params: {
			status,
			tanggal,
		},
	});

	return res.data;
};
