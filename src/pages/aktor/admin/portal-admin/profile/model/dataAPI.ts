import AxiosClient from "@/provider/axios";
import type { Profile, PaginatedResponse } from "./dataTypes";

export const getProfile = async (): Promise<PaginatedResponse<Profile>> => {
	const res = await AxiosClient.get("/portal-sekolah/profile");

	return res.data;
};
