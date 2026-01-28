import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Mading,
	MadingStats,
	KategoriMading,
	TagMading,
	UpdatePayload,
} from "./dataTypes";
import type { MadingFormValues } from "./dataSchema";

export type GetMadingParams = {
	page: number;
	limit: number;
	search: string;
	status: "draft" | "publish" | undefined;
};

export const getMading = async ({
	page,
	limit,
	search,
	status,
}: GetMadingParams): Promise<PaginatedResponse<Mading>> => {
	const res = await AxiosClient.get("/website/mading", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getMadingByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<Mading>> => {
	const res = await AxiosClient.get(`/website/mading/${id}`);

	return res.data;
};

export const getKategoriMading = async (): Promise<
	PaginatedResponse<KategoriMading>
> => {
	const res = await AxiosClient.get("/referensi/kategori-mading");

	return res.data;
};

export const getTagMading = async (): Promise<PaginatedResponse<TagMading>> => {
	const res = await AxiosClient.get("/referensi/tag-mading");

	return res.data;
};

export const getMadingStats = async (): Promise<
	PaginatedResponseByID<MadingStats>
> => {
	const res = await AxiosClient.get("/website/mading/stats");

	return res.data;
};

export async function postMading(payload: MadingFormValues) {
	const res = await AxiosClient.post("/website/mading", payload);
	return res.data;
}

export async function updateMading({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/website/mading/${id}`, data);
	return res.data;
}

export async function deleteMading(id: string) {
	const res = await AxiosClient.delete(`/website/mading/${id}`);
	return res.data;
}
