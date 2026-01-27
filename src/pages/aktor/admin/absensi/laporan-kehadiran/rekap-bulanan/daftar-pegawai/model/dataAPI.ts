import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { RekapBulanan } from "./dataTypes";

export type GetRekapBulananParams = {
	tahun: string;
	bulan: string;
};

export const getRekapBulanan = async ({
	tahun,
	bulan,
}: GetRekapBulananParams): Promise<PaginatedResponse<RekapBulanan>> => {
	const res = await AxiosClient.get("/presensi/laporan-bulanan", {
		params: {
			tahun,
			bulan,
		},
	});

	return res.data;
};
