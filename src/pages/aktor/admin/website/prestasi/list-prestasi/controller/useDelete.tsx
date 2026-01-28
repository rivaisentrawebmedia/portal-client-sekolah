import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePrestasi, type Prestasi } from "../model";

export function useDeletePrestasi() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<Prestasi | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deletePrestasi,

		onMutate: () => {
			return toast.loading("Menghapus data prestasi...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["prestasi"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus prestasi",
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
