import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { HasilSekolah } from "./dataTypes";
import type { HasilSekolahFormValues } from "./dataSchema";

export const getHasilSekolah = async (): Promise<
	PaginatedResponseByID<HasilSekolah>
> => {
	const res = await AxiosClient.get("/website/hasil-sekolah");

	return res.data;
};

export async function postHasilSekolah(payload: HasilSekolahFormValues) {
	const res = await AxiosClient.post("/website/hasil-sekolah", payload);
	return res.data;
}
