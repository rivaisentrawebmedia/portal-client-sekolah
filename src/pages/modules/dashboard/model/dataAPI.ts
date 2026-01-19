import AxiosClient from "@/provider/axios";
import type { Dashboard, PaginatedResponse } from "./dataTypes";

export const getDashboard = async (): Promise<PaginatedResponse<Dashboard>> => {
	const res = await AxiosClient.get("/dashboard");

	return res.data;
};
