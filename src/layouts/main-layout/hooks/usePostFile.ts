import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { uploadFile } from "../model/dataAPI";
import { compressImage } from "@/utils/compressImage";

type UploadParams = {
	form: UseFormReturn<any>;
	fields: string;
	file: File;
	label?: string;
};

export function usePostUploadFile() {
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	const onSubmitUploadFile = async ({
		form,
		fields,
		file,
		label,
	}: UploadParams) => {
		if (!file) {
			toast.error("Tidak ada file yang dipilih");
			return;
		}

		setLoading(true);
		const toastId = toast.loading("Mengunggah file...");

		try {
			// ✅ Compress terlebih dahulu
			const compressedFile = await compressImage(file, {
				maxWidth: 1280,
				quality: 0.7,
			});

			const res = await uploadFile(compressedFile);

			await queryClient.invalidateQueries({ queryKey: ["file"] });

			form.setValue(fields, res?.data?.url, {
				shouldDirty: true,
				shouldTouch: true,
				shouldValidate: true,
			});

			if (label) {
				form.setValue(label, file.name, {
					shouldDirty: true,
				});
			}

			toast.update(toastId, {
				render: "Unggah file berhasil",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error: any) {
			console.error(error);

			toast.update(toastId, {
				render: error?.response?.data?.message || "Gagal mengunggah file.",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		onSubmitUploadFile,
	};
}
