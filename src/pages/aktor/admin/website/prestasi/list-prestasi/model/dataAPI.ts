import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Prestasi,
	PrestasiStats,
	KategoriPrestasi,
	TagPrestasi,
	UpdatePayload,
} from "./dataTypes";
import type { PrestasiFormValues } from "./dataSchema";

export type GetPrestasiParams = {
	page: number;
	limit: number;
	search: string;
	status: "draft" | "publish" | undefined;
};

export const getPrestasi = async ({
	page,
	limit,
	search,
	status,
}: GetPrestasiParams): Promise<PaginatedResponse<Prestasi>> => {
	const res = await AxiosClient.get("/website/prestasi", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getPrestasiByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<Prestasi>> => {
	const res = await AxiosClient.get(`/website/prestasi/${id}`);

	return res.data;
};

export const getKategoriPrestasi = async (): Promise<
	PaginatedResponse<KategoriPrestasi>
> => {
	const res = await AxiosClient.get("/referensi/kategori-prestasi");

	return res.data;
};

export const getTagPrestasi = async (): Promise<
	PaginatedResponse<TagPrestasi>
> => {
	const res = await AxiosClient.get("/referensi/tag-prestasi");

	return res.data;
};

export const getPrestasiStats = async (): Promise<
	PaginatedResponseByID<PrestasiStats>
> => {
	const res = await AxiosClient.get("/website/prestasi/stats");

	return res.data;
};

export async function postPrestasi(payload: PrestasiFormValues) {
	const res = await AxiosClient.post("/website/prestasi", payload);
	return res.data;
}

export async function updatePrestasi({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/website/prestasi/${id}`, data);
	return res.data;
}

export async function deletePrestasi(id: string) {
	const res = await AxiosClient.delete(`/website/prestasi/${id}`);
	return res.data;
}
