import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteAgenda, type Agenda } from "../model";

export function useDeleteAgenda() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<Agenda | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteAgenda,

		onMutate: () => {
			return toast.loading("Menghapus data agenda...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["agenda"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus agenda",
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
