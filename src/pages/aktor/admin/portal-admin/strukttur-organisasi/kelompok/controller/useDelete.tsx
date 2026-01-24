import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Kelompok } from "../model";
import AxiosClient from "@/provider/axios";

export function useDeleteKelompok() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<Kelompok | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await AxiosClient.delete(
				`/portal-sekolah/kelompok-jabatan/${id}`,
			);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menghapus data kelompok...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["kelompok"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus kelompok",
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
