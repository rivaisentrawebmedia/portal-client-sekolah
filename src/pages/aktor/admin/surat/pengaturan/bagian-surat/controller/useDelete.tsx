import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteBagianSurat, type BagianSurat } from "../model";

export function useDeleteBagianSurat() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<BagianSurat | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteBagianSurat,

		onMutate: () => {
			return toast.loading("Menghapus data Bagian Surat...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["bagian-surat"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus Bagian Surat",
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
