import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { BagianSurat, UpdatePayload } from "./dataTypes";

export type GetBagianSuratParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getBagianSurat = async ({
	page,
	limit,
	search,
	spam,
}: GetBagianSuratParams): Promise<PaginatedResponse<BagianSurat>> => {
	const res = await AxiosClient.get("/surat/bagian-surat", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};

export async function postBagianSurat(payload: any) {
	const res = await AxiosClient.post("/surat/bagian-surat", payload);
	return res.data;
}

export async function updateBagianSurat({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/surat/bagian-surat/${id}`, data);
	return res.data;
}

export async function deleteBagianSurat(id: string) {
	const res = await AxiosClient.delete(`/surat/bagian-surat/${id}`);
	return res.data;
}
