import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { RekapBulananByID } from "./dataTypes";

export type GetRekapBulananParams = {
	tahun: number;
	bulan: number;
	pegawai_id: string;
};

export const getRekapBulanan = async ({
	tahun,
	bulan,
	pegawai_id,
}: GetRekapBulananParams): Promise<PaginatedResponseByID<RekapBulananByID>> => {
	const res = await AxiosClient.get("/presensi/laporan-bulanan-detail", {
		params: {
			tahun,
			bulan,
			pegawai_id,
		},
	});

	return res.data;
};
