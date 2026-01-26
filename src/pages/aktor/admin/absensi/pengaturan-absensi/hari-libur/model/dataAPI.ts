import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { HariLibur, UpdatePayload } from "./dataTypes";
import type { HariLiburFormValues } from "./dataSchema";

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

export async function postHariLibur(payload: HariLiburFormValues) {
	const res = await AxiosClient.post("/presensi/hari-libur", payload);
	return res.data;
}

export async function updateHariLibur({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/hari-libur/${id}`, data);
	return res.data;
}

export async function deleteHariLibur(id: string) {
	const res = await AxiosClient.delete(`/presensi/hari-libur/${id}`);
	return res.data;
}
