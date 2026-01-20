import AxiosClient from "@/provider/axios";
import type { Modul, PaginatedResponse } from "./dataTypes";

export type GetModulParams = {
	search?: string;
};

export const getModul = async ({
	search,
}: GetModulParams): Promise<PaginatedResponse<Modul>> => {
	const res = await AxiosClient.get("/portal-sekolah/modul", {
		params: {
			search,
		},
	});

	return res.data;
};
