import AxiosClient from "@/provider/axios";
import type {
	KontrolAkses,
	KontrolAksesMenu,
	ManajemenUser,
	ManajemenUserByID,
	PaginatedResponse,
	PaginatedResponseKontrolAkses,
	PaginatedResponseKontrolAksesMenu,
	PaginatedResponseManajamenUserByID,
} from "./dataTypes";

export type GetManajemenUserParams = {
	page: number;
	limit?: number;
	search?: string;
};

export const getManajemenUser = async ({
	page,
	limit,
	search,
}: GetManajemenUserParams): Promise<PaginatedResponse<ManajemenUser>> => {
	const res = await AxiosClient.get("/portal-sekolah/user", {
		params: {
			page,
			limit,
			search: search || undefined,
		},
	});

	return res.data;
};

export const getManajemenUserByID = async (
	id: string,
): Promise<PaginatedResponseManajamenUserByID<ManajemenUserByID>> => {
	const res = await AxiosClient.get(`/portal-sekolah/user/${id}`);
	return res.data;
};

export const getKontrolAkses = async (
	user_id: string,
): Promise<PaginatedResponseKontrolAkses<KontrolAkses>> => {
	const res = await AxiosClient.get(`/portal-sekolah/kontrol-akses/modul`, {
		params: {
			user_id,
		},
	});
	return res.data;
};

export const getKontrolAksesMenu = async (
	user_id: string,
	modul_id: string,
): Promise<PaginatedResponseKontrolAksesMenu<KontrolAksesMenu>> => {
	const res = await AxiosClient.get(`/portal-sekolah/kontrol-akses/menu`, {
		params: {
			user_id,
			modul_id,
		},
	});
	return res.data;
};
