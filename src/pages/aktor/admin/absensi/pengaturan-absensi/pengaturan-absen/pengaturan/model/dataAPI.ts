import AxiosClient from "@/provider/axios";
import type { PengaturanAbsensi, PaginatedResponse } from "./dataTypes";

export const getPengaturanAbsensi = async (): Promise<
	PaginatedResponse<PengaturanAbsensi>
> => {
	const res = await AxiosClient.get("/presensi/pengaturan-absensi");

	return res.data;
};
