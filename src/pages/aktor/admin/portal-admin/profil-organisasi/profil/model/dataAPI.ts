import AxiosClient from "@/provider/axios";
import type { ProfilOrganisasi, PaginatedResponse } from "./dataTypes";

export const getProfilOrganisasi = async (): Promise<
	PaginatedResponse<ProfilOrganisasi>
> => {
	const res = await AxiosClient.get("/portal-sekolah/profil-organisasi");

	return res.data;
};
