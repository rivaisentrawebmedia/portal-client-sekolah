import AxiosClient from "@/provider/axios";
import type { DaftarLokasi, PaginatedResponse } from "./dataTypes";

export const getDaftarLokasi = async (): Promise<
	PaginatedResponse<DaftarLokasi>
> => {
	const res = await AxiosClient.get("/presensi/lokasi");

	return res.data;
};
