import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { Kelompok, UpdatePayload } from "./dataTypes";
import type { KelompokFormValues } from "./dataSchema";

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

export async function postKelompok(payload: KelompokFormValues) {
	const res = await AxiosClient.post(
		"/portal-sekolah/kelompok-jabatan",
		payload,
	);
	return res.data;
}

export async function updateKelompok({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(
		`/portal-sekolah/kelompok-jabatan/${id}`,
		data,
	);
	return res.data;
}

export async function deleteKelompok(id: string) {
	const res = await AxiosClient.delete(
		`/portal-sekolah/kelompok-jabatan/${id}`,
	);
	return res.data;
}
