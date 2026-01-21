import { uploadFile } from "@/layouts/main-layout/model/dataAPI";
import { compressImage } from "@/utils/compressImage";
import { useState } from "react";
import { toast } from "react-toastify";

export function usePostUploadFileReturnURL() {
	const [loading, setLoading] = useState(false);

	const onSubmitUploadFile = async (file: File): Promise<string | null> => {
		if (!file) return null;

		setLoading(true);
		const toastId = toast.loading("Mengunggah file...");

		try {
			const compressedFile = await compressImage(file, {
				maxWidth: 1280,
				quality: 0.7,
			});

			const res = await uploadFile(compressedFile);

			toast.update(toastId, {
				render: "Unggah file berhasil",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});

			return res?.data?.url ?? null;
		} catch (error: any) {
			toast.update(toastId, {
				render: error?.response?.data?.message || "Gagal mengunggah file",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
			return null;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		onSubmitUploadFile,
	};
}
