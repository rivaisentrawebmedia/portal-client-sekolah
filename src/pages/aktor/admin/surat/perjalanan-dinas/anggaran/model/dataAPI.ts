import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { Anggaran, UpdatePayload } from "./dataTypes";
import type { AnggaranFormValues } from "./dataSchema";

export type GetAnggaranParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export const getAnggaran = async ({
	page,
	limit,
	search,
	spam,
}: GetAnggaranParams): Promise<PaginatedResponse<Anggaran>> => {
	const res = await AxiosClient.get("/surat/anggaran", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};

export async function postAnggaran(payload: AnggaranFormValues) {
	const res = await AxiosClient.post("/surat/anggaran", payload);
	return res.data;
}

export async function updateAnggaran({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/surat/anggaran/${id}`, data);
	return res.data;
}

export async function deleteAnggaran(id: string) {
	const res = await AxiosClient.delete(`/surat/anggaran/${id}`);
	return res.data;
}
