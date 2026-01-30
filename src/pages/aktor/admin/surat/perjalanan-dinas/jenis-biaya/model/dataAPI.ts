import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { JenisBiaya, UpdatePayload } from "./dataTypes";
import type { JenisBiayaFormValues } from "./dataSchema";

export type GetJenisBiayaParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getJenisBiaya = async ({
	page,
	limit,
	search,
	spam,
}: GetJenisBiayaParams): Promise<PaginatedResponse<JenisBiaya>> => {
	const res = await AxiosClient.get("/surat/jenis-biaya", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};

export async function postJenisBiaya(payload: JenisBiayaFormValues) {
	const res = await AxiosClient.post("/surat/jenis-biaya", payload);
	return res.data;
}

export async function updateJenisBiaya({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/surat/jenis-biaya/${id}`, data);
	return res.data;
}

export async function deleteJenisBiaya(id: string) {
	const res = await AxiosClient.delete(`/surat/jenis-biaya/${id}`);
	return res.data;
}
