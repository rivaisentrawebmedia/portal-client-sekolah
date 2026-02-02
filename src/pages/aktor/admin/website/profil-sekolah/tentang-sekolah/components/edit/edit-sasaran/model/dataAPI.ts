import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { SasaranSekolah } from "./dataTypes";
import type { SasaranSekolahFormValues } from "./dataSchema";

export const getSasaranSekolah = async (): Promise<
	PaginatedResponseByID<SasaranSekolah>
> => {
	const res = await AxiosClient.get("/website/sasaran-sekolah");

	return res.data;
};

export async function postSasaranSekolah(payload: SasaranSekolahFormValues) {
	const res = await AxiosClient.post("/website/sasaran-sekolah", payload);
	return res.data;
}
