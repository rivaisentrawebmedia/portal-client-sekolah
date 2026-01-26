import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { JamMasuk } from "./dataTypes";

export const getJamMasuk = async (): Promise<PaginatedResponse<JamMasuk>> => {
	const res = await AxiosClient.get("/presensi/pengaturan-absensi-hari");

	return res.data;
};

export async function postJamMasuk(payload: any) {
	const res = await AxiosClient.post(
		"/presensi/pengaturan-absensi-hari",
		payload,
	);
	return res.data;
}
