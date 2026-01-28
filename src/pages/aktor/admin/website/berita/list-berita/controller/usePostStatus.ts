import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AxiosClient from "@/provider/axios";
import { useState } from "react";

export type PayloadStatusBerita = {
	id: string[];
	status: "publish" | "draft";
};

export function usePostStatusStatusBerita() {
	const queryClient = useQueryClient();
	const [isShow, setIsShow] = useState(false);
	const [checkedPool, setCheckedPool] = useState<string[]>([]);

	const mutation = useMutation({
		mutationFn: (payload: PayloadStatusBerita) =>
			AxiosClient.post("/website/berita/set-status", payload),

		onMutate: () => {
			const toastId = toast.loading("Memproses...");
			return { toastId };
		},

		onSuccess: async (_, __, context) => {
			await queryClient.invalidateQueries({ queryKey: ["berita"] });

			toast.update(context?.toastId, {
				render: "Berhasil",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});

			setIsShow(false);
			setCheckedPool([]);
		},

		onError: (_, __, context: any) => {
			toast.update(context?.toastId, {
				render: "Gagal memproses data",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		},
	});

	const onSubmit = (status: "publish" | "draft") => {
		mutation.mutate({
			id: checkedPool,
			status: status,
		});
	};

	return {
		checkedPool,
		setCheckedPool,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
	};
}
