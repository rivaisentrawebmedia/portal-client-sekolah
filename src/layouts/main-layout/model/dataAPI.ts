import AxiosClient from "@/provider/axios";
import type { UploadFileResponse } from "./dataType";

export async function uploadFile(file: File): Promise<UploadFileResponse> {
	const formData = new FormData();
	formData.append("file", file);

	const { data } = await AxiosClient.post("/file", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}
