import AxiosClient from "@/provider/axios";
import type { PaginatedResponse, PengaturanAbsensi } from "./dataTypes";
import type { PengaturanAbsensiFormValues } from "./dataSchema";

export const getPengaturanAbsensi = async (): Promise<
	PaginatedResponse<PengaturanAbsensi>
> => {
	const res = await AxiosClient.get("/presensi/pengaturan-absensi");

	return res.data;
};

export async function postPengaturanAbsensi(
	payload: PengaturanAbsensiFormValues,
) {
	const res = await AxiosClient.post("/presensi/pengaturan-absensi", payload);
	return res.data;
}
