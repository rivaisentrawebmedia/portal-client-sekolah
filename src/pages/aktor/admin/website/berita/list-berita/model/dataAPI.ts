import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Berita,
	BeritaStats,
	KategoriBerita,
	TagBerita,
	UpdatePayload,
} from "./dataTypes";
import type { BeritaFormValues } from "./dataSchema";

export type GetBeritaParams = {
	page: number;
	limit: number;
	search: string;
	status: "draft" | "publish" | undefined;
	urutkan: "terbaru" | "terpopuler";
};

export const getBerita = async ({
	page,
	limit,
	search,
	status,
	urutkan,
}: GetBeritaParams): Promise<PaginatedResponse<Berita>> => {
	const res = await AxiosClient.get("/website/berita", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
			urutkan,
		},
	});

	return res.data;
};

export const getBeritaByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<Berita>> => {
	const res = await AxiosClient.get(`/website/berita/${id}`);

	return res.data;
};

export const getKategoriBerita = async (): Promise<
	PaginatedResponse<KategoriBerita>
> => {
	const res = await AxiosClient.get("/referensi/kategori-berita");

	return res.data;
};

export const getTagBerita = async (): Promise<PaginatedResponse<TagBerita>> => {
	const res = await AxiosClient.get("/referensi/tag-berita");

	return res.data;
};

export const getBeritaStats = async (): Promise<
	PaginatedResponseByID<BeritaStats>
> => {
	const res = await AxiosClient.get("/website/berita/stats");

	return res.data;
};

export async function postBerita(payload: BeritaFormValues) {
	const res = await AxiosClient.post("/website/berita", payload);
	return res.data;
}

export async function updateBerita({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/website/berita/${id}`, data);
	return res.data;
}

export async function deleteBerita(id: string) {
	const res = await AxiosClient.delete(`/website/berita/${id}`);
	return res.data;
}
