import AxiosClient from "@/provider/axios";
import type { StatusAbsen, PaginatedResponse } from "./dataTypes";

export type GetStatusAbsenParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getStatusAbsen = async ({
	page,
	limit,
	search,
	spam,
}: GetStatusAbsenParams): Promise<PaginatedResponse<StatusAbsen>> => {
	const res = await AxiosClient.get("/presensi/pegawai-absensi", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};
