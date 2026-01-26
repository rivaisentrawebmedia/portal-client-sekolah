import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type {
	Profile,
	UpdatePayload,
	UpdateResetPasswordPayload,
} from "./dataTypes";

export const getProfile = async (): Promise<PaginatedResponseByID<Profile>> => {
	const res = await AxiosClient.get("/portal-sekolah/profile");

	return res.data;
};

export async function updateProfile({ data }: UpdatePayload) {
	const res = await AxiosClient.post(`/portal-sekolah/profile`, data);
	return res.data;
}

export async function updatePassword({ data }: UpdateResetPasswordPayload) {
	const res = await AxiosClient.post(`/portal-sekolah/reset-password`, data);
	return res.data;
}
