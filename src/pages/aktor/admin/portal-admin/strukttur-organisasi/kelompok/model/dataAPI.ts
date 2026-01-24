import AxiosClient from "@/provider/axios";
import type { Kelompok, PaginatedResponse } from "./dataTypes";

export type GetKelompokParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getKelompok = async ({
	page,
	limit,
	search,
	spam,
}: GetKelompokParams): Promise<PaginatedResponse<Kelompok>> => {
	const res = await AxiosClient.get("/portal-sekolah/kelompok-jabatan", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};
