import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Pengumuman,
	PengumumanStats,
	KategoriPengumuman,
	TagPengumuman,
	UpdatePayload,
} from "./dataTypes";
import type { PengumumanFormValues } from "./dataSchema";

export type GetPengumumanParams = {
	page: number;
	limit: number;
	search: string;
	status: "draft" | "publish" | undefined;
};

export const getPengumuman = async ({
	page,
	limit,
	search,
	status,
}: GetPengumumanParams): Promise<PaginatedResponse<Pengumuman>> => {
	const res = await AxiosClient.get("/website/pengumuman", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getPengumumanByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<Pengumuman>> => {
	const res = await AxiosClient.get(`/website/pengumuman/${id}`);

	return res.data;
};

export const getKategoriPengumuman = async (): Promise<
	PaginatedResponse<KategoriPengumuman>
> => {
	const res = await AxiosClient.get("/referensi/kategori-pengumuman");

	return res.data;
};

export const getTagPengumuman = async (): Promise<
	PaginatedResponse<TagPengumuman>
> => {
	const res = await AxiosClient.get("/referensi/tag-pengumuman");

	return res.data;
};

export const getPengumumanStats = async (): Promise<
	PaginatedResponseByID<PengumumanStats>
> => {
	const res = await AxiosClient.get("/website/pengumuman/stats");

	return res.data;
};

export async function postPengumuman(payload: PengumumanFormValues) {
	const res = await AxiosClient.post("/website/pengumuman", payload);
	return res.data;
}

export async function updatePengumuman({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/website/pengumuman/${id}`, data);
	return res.data;
}

export async function deletePengumuman(id: string) {
	const res = await AxiosClient.delete(`/website/pengumuman/${id}`);
	return res.data;
}
