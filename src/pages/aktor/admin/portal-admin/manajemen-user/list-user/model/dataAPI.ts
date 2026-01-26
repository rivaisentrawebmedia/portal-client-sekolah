import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	KontrolAkses,
	KontrolAksesMenu,
	ManajemenUser,
	ManajemenUserByID,
	RiwayatAktivitas,
	UpdatePayload,
} from "./dataTypes";

export type GetManajemenUserParams = {
	page: number;
	limit?: number;
	search?: string;
};

export type GetRiwayatAktivitasParams = {
	id: string;
	page: number;
	limit?: number;
	search?: string;
	jangka_waktu?: string;
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
): Promise<PaginatedResponseByID<ManajemenUserByID>> => {
	const res = await AxiosClient.get(`/portal-sekolah/user/${id}`);
	return res.data;
};

export const getKontrolAkses = async (
	user_id: string,
): Promise<PaginatedResponse<KontrolAkses>> => {
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
): Promise<PaginatedResponse<KontrolAksesMenu>> => {
	const res = await AxiosClient.get(`/portal-sekolah/kontrol-akses/menu`, {
		params: {
			user_id,
			modul_id,
		},
	});
	return res.data;
};

export const getRiwayatAktivitas = async ({
	id,
	page,
	jangka_waktu,
	limit,
	search,
}: GetRiwayatAktivitasParams): Promise<PaginatedResponse<RiwayatAktivitas>> => {
	const res = await AxiosClient.get(
		`/portal-sekolah/user/${id}/riwayat-aktifitas`,
		{
			params: {
				page,
				limit,
				search,
				jangka_waktu,
			},
		},
	);
	return res.data;
};

export async function postUser(payload: any) {
	const res = await AxiosClient.post("/portal-sekolah/user", payload);
	return res.data;
}

export async function updateUser({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/portal-sekolah/user/${id}`, data);
	return res.data;
}

export async function deleteUser(id: string) {
	const res = await AxiosClient.delete(`/portal-sekolah/user/${id}`);
	return res.data;
}
