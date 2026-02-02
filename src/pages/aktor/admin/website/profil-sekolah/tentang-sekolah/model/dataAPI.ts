import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { TentangSekolah } from "./dataTypes";
import type { TentangSekolahFormValues } from "./dataSchema";

export const getTentangSekolah = async (): Promise<
	PaginatedResponseByID<TentangSekolah>
> => {
	const res = await AxiosClient.get("/website/profil");

	return res.data;
};

export async function postTentangSekolah(payload: TentangSekolahFormValues) {
	const res = await AxiosClient.post("/website/profil", payload);
	return res.data;
}
