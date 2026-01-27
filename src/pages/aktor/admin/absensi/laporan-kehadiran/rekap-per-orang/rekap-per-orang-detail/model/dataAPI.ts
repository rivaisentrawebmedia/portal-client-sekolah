import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { RekapPerOrangByID } from "./dataTypes";

export type GetRekapPerOrangParams = {
	tahun: number;
	bulan: number;
	pegawai_id: string;
};

export const getRekapPerOrang = async ({
	tahun,
	bulan,
	pegawai_id,
}: GetRekapPerOrangParams): Promise<
	PaginatedResponseByID<RekapPerOrangByID>
> => {
	const res = await AxiosClient.get("/presensi/laporan-per-orang-detail", {
		params: {
			tahun,
			bulan,
			pegawai_id,
		},
	});

	return res.data;
};
