import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { Modul } from "./dataTypes";

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
