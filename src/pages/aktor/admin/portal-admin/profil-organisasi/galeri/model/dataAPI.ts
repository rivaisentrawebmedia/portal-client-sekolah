import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { Galeri, GaleriPayload } from "./dataTypes";

export const getGaleri = async (): Promise<PaginatedResponse<Galeri>> => {
	const res = await AxiosClient.get("/portal-sekolah/galeri");

	return res.data;
};

export async function postGaleri(payload: GaleriPayload) {
	const res = await AxiosClient.post("/portal-sekolah/galeri", payload);
	return res.data;
}

export async function deleteGaleri(id: string) {
	const res = await AxiosClient.delete(`/portal-sekolah/galeri/${id}`);
	return res.data;
}
