import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { RekapPerOrang } from "./dataTypes";

export type GetRekapPerOrangParams = {
	tahun: string;
	bulan: string;
};

export const getRekapPerOrang = async ({
	tahun,
	bulan,
}: GetRekapPerOrangParams): Promise<PaginatedResponse<RekapPerOrang>> => {
	const res = await AxiosClient.get("/presensi/laporan-bulanan", {
		params: {
			tahun,
			bulan,
		},
	});

	return res.data;
};
