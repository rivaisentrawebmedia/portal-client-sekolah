import AxiosClient from "@/provider/axios";
import type { Menu, PaginatedResponse, UploadFileResponse } from "./dataType";

export async function uploadFile(file: File): Promise<UploadFileResponse> {
	const formData = new FormData();
	formData.append("file", file);

	const { data } = await AxiosClient.post("/portal-sekolah/file", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export type GetMenuParams = {
	modul_id?: string;
};

export const getMenu = async ({
	modul_id,
}: GetMenuParams): Promise<PaginatedResponse<Menu>> => {
	const res = await AxiosClient.get("/portal-sekolah/menu", {
		params: {
			modul_id,
		},
	});

	return res.data;
};
