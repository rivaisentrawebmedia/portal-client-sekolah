import AxiosClient from "@/provider/axios";
import type { JamMasuk, PaginatedResponse } from "./dataTypes";

export const getJamMasuk = async (): Promise<PaginatedResponse<JamMasuk>> => {
	const res = await AxiosClient.get("/presensi/pengaturan-absensi-hari");

	return res.data;
};
