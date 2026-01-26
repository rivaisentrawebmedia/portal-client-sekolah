import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { UpdatePayload, VisiMisi } from "./dataTypes";

export const getVisiMisi = async (): Promise<
	PaginatedResponseByID<VisiMisi>
> => {
	const res = await AxiosClient.get("/portal-sekolah/visi-misi");

	return res.data;
};

export async function updateVisiMisi({ data }: UpdatePayload) {
	const res = await AxiosClient.post(`/portal-sekolah/visi-misi`, data);
	return res.data;
}
