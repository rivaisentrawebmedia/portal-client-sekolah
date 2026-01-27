import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteVisit, type Visit } from "../model";

export function useDeleteVisit() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<Visit | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteVisit,

		onMutate: () => {
			return toast.loading("Menghapus data Visit...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["visit"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus Visit",
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
