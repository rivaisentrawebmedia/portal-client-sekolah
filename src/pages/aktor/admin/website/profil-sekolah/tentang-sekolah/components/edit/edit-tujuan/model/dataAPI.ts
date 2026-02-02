import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { TujuanSekolah } from "./dataTypes";
import type { TujuanSekolahFormValues } from "./dataSchema";

export const getTujuanSekolah = async (): Promise<
	PaginatedResponseByID<TujuanSekolah>
> => {
	const res = await AxiosClient.get("/website/tujuan-sekolah");

	return res.data;
};

export async function postTujuanSekolah(payload: TujuanSekolahFormValues) {
	const res = await AxiosClient.post("/website/tujuan-sekolah", payload);
	return res.data;
}
