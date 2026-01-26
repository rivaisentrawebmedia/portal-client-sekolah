import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { ProfilOrganisasi, UpdatePayload } from "./dataTypes";

export const getProfilOrganisasi = async (): Promise<
	PaginatedResponseByID<ProfilOrganisasi>
> => {
	const res = await AxiosClient.get("/portal-sekolah/profil-organisasi");

	return res.data;
};

export async function updateProfil({ data }: UpdatePayload) {
	const res = await AxiosClient.post(`/portal-sekolah/profil-organisasi`, data);
	return res.data;
}
