import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postGaleri } from "../model";

export function usePostGaleri() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: postGaleri,

		onMutate: () => toast.loading("Menyimpan data galeri..."),

		onSuccess: async (data, _vars, toastId) => {
			await queryClient.invalidateQueries({ queryKey: ["galeri"] });

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan galeri",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});
		},

		onError: (err: any, _v, toastId) => {
			toast.update(toastId || "", {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	/** 🔥 dipanggil setelah upload sukses */
	const submitByUrl = (url: string) => {
		mutation.mutate({ gambar: url });
	};

	return {
		submitByUrl,
		disabled: mutation.isPending,
	};
}
