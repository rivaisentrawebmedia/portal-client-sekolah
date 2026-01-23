import AxiosClient from "@/provider/axios";
import type { HariLibur, PaginatedResponse } from "./dataTypes";

export type GetHariLiburParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getHariLibur = async ({
	page,
	limit,
	search,
	spam,
}: GetHariLiburParams): Promise<PaginatedResponse<HariLibur>> => {
	const res = await AxiosClient.get("/presensi/hari-libur", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};
