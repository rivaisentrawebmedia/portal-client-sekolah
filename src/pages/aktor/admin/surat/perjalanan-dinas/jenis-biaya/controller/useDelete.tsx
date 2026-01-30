import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteJenisBiaya, type JenisBiaya } from "../model";

export function useDeleteJenisBiaya() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<JenisBiaya | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteJenisBiaya,

		onMutate: () => {
			return toast.loading("Menghapus data Jenis Biaya...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jenis-biaya"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus Jenis Biaya",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			setIsShow(false);
			setSelected(null);
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId || "", {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const handleDelete = () => {
		if (!selected?.id) return;
		mutation.mutate(selected.id);
	};

	return {
		isShow,
		setIsShow,
		selected,
		setSelected,
		handleDelete,
		disabled: mutation.isPending,
	};
}
