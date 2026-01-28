import AxiosClient, {
	type PaginatedResponse,
	type PaginatedResponseByID,
} from "@/provider/axios";
import type {
	Agenda,
	AgendaStats,
	KategoriAgenda,
	TagAgenda,
	UpdatePayload,
} from "./dataTypes";
import type { AgendaFormValues } from "./dataSchema";

export type GetAgendaParams = {
	page: number;
	limit: number;
	search: string;
	status: "draft" | "publish" | undefined;
};

export const getAgenda = async ({
	page,
	limit,
	search,
	status,
}: GetAgendaParams): Promise<PaginatedResponse<Agenda>> => {
	const res = await AxiosClient.get("/website/agenda", {
		params: {
			page,
			limit,
			search: search || undefined,
			status,
		},
	});

	return res.data;
};

export const getAgendaByID = async ({
	id,
}: {
	id: string;
}): Promise<PaginatedResponseByID<Agenda>> => {
	const res = await AxiosClient.get(`/website/agenda/${id}`);

	return res.data;
};

export const getKategoriAgenda = async (): Promise<
	PaginatedResponse<KategoriAgenda>
> => {
	const res = await AxiosClient.get("/referensi/kategori-agenda");

	return res.data;
};

export const getTagAgenda = async (): Promise<PaginatedResponse<TagAgenda>> => {
	const res = await AxiosClient.get("/referensi/tag-agenda");

	return res.data;
};

export const getAgendaStats = async (): Promise<
	PaginatedResponseByID<AgendaStats>
> => {
	const res = await AxiosClient.get("/website/agenda/stats");

	return res.data;
};

export async function postAgenda(payload: AgendaFormValues) {
	const res = await AxiosClient.post("/website/agenda", payload);
	return res.data;
}

export async function updateAgenda({ id, data }: UpdatePayload) {
	const res = await AxiosClient.put(`/website/agenda/${id}`, data);
	return res.data;
}

export async function deleteAgenda(id: string) {
	const res = await AxiosClient.delete(`/website/agenda/${id}`);
	return res.data;
}
