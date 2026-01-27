import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { PegawaiPalingRajin } from "./dataTypes";

export type GetPegawaiPalingRajinParams = {
	tahun: string;
	bulan: string;
};

export const getPegawaiPalingRajin = async ({
	tahun,
	bulan,
}: GetPegawaiPalingRajinParams): Promise<
	PaginatedResponse<PegawaiPalingRajin>
> => {
	const res = await AxiosClient.get("/presensi/pegawai-rajin", {
		params: {
			tahun,
			bulan,
		},
	});

	return res.data;
};
