import AxiosClient from "@/provider/axios";
import type {
	Jabatan,
	PaginatedResponse,
	PaginatedResponseRiwayat,
	RiwayatPejabat,
} from "./dataTypes";

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
}: GetRiwayatPejabatParams): Promise<
	PaginatedResponseRiwayat<RiwayatPejabat>
> => {
	const res = await AxiosClient.get(`/portal-sekolah/jabatan/${id}`);

	return res.data;
};
