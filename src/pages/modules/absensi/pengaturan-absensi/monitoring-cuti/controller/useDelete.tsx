import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { MonitoringCuti } from "../model";
import AxiosClient from "@/provider/axios";

export function useDeleteMonitoringCuti() {
	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<MonitoringCuti | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await AxiosClient.delete(`/presensi/monitoring-cuti/${id}`);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menghapus data Periode Cuti...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["monitoring-cuti"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menghapus Periode Cuti",
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
