import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Jabatan,
	RiwayatPejabat,
	UpdatePayload,
	UpdatePejabatPayload,
} from "./dataTypes";
import type { JabatanFormValues } from "./dataSchema";

export type GetJabatanParams = {
	page: number;
	limit?: number;
	search?: string;
	spam?: boolean;
};

export type GetRiwayatPejabatParams = {
	id: string;
};

export const getJabatan = async ({
	page,
	limit,
	search,
	spam,
}: GetJabatanParams): Promise<PaginatedResponse<Jabatan>> => {
	const res = await AxiosClient.get("/portal-sekolah/jabatan", {
		params: {
			page,
			limit,
			search: search || undefined,
			spam,
		},
	});

	return res.data;
};

export const getRiwayatPejabat = async ({
	id,
}: GetRiwayatPejabatParams): Promise<PaginatedResponseByID<RiwayatPejabat>> => {
	const res = await AxiosClient.get(`/portal-sekolah/jabatan/${id}`);

	return res.data;
};

export async function postPejabat(payload: JabatanFormValues) {
	const res = await AxiosClient.post("/portal-sekolah/jabatan", payload);
	return res.data;
}

export async function postGantiPejabat({ id, data }: UpdatePayload) {
	const res = await AxiosClient.post(
		`/portal-sekolah/jabatan/${id}/ganti`,
		data,
	);
	return res.data;
}

export async function updatePejabat({ id, data }: UpdatePejabatPayload) {
	const res = await AxiosClient.put(`/portal-sekolah/jabatan/${id}`, data);
	return res.data;
}

export async function deletePejabat(id: string) {
	const res = await AxiosClient.delete(`/portal-sekolah/jabatan/${id}`);
	return res.data;
}
