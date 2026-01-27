import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { Dashboard } from "./dataTypes";

export const getDashboard = async (): Promise<
	PaginatedResponseByID<Dashboard>
> => {
	const res = await AxiosClient.get("/website/stats");

	return res.data;
};
