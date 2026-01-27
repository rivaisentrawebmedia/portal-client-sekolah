import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { Visit } from "../../list-visit/model";

export type GetVisitParams = {
	id: string;
};

export const getVisitByID = async ({
	id,
}: GetVisitParams): Promise<PaginatedResponseByID<Visit>> => {
	const res = await AxiosClient.get(`/presensi/visit/${id}`);

	return res.data;
};
