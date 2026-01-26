import AxiosClient, { type PaginatedResponse } from "@/provider/axios";
import type { DaftarLokasi, UpdatePayload } from "./dataTypes";

export const getDaftarLokasi = async (): Promise<
	PaginatedResponse<DaftarLokasi>
> => {
	const res = await AxiosClient.get("/presensi/lokasi");

	return res.data;
};

export async function postDaftarLokasi(payload: any) {
	const res = await AxiosClient.post("/presensi/lokasi", payload);
	return res.data;
}

export async function updateDaftarLokasi({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/presensi/lokasi/${id}`, data);
	return res.data;
}

export async function deleteDaftarLokasi(id: string) {
	const res = await AxiosClient.delete(`/presensi/lokasi/${id}`);
	return res.data;
}
