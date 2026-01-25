import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { DaftarLokasi } from "../model";
import AxiosClient from "@/provider/axios";

export function useDeleteDaftarLokasi() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<DaftarLokasi | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await AxiosClient.delete(`/presensi/lokasi/${id}`);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menghapus data Daftar Lokasi...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["lokasi"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus Daftar Lokasi",
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
