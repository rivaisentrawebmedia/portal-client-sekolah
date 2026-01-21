import AxiosClient from "@/provider/axios";
import type { VisiMisi, PaginatedResponse } from "./dataTypes";

export const getVisiMisi = async (): Promise<PaginatedResponse<VisiMisi>> => {
	const res = await AxiosClient.get("/portal-sekolah/visi-misi");

	return res.data;
};
