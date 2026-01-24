import AxiosClient from "@/provider/axios";
import type { Galeri, PaginatedResponse } from "./dataTypes";

export const getGaleri = async (): Promise<PaginatedResponse<Galeri>> => {
	const res = await AxiosClient.get("/portal-sekolah/galeri");

	return res.data;
};
