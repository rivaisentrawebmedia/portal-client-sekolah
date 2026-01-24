import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

export type PayloadStatusAbsen = {
	id: string;
	perlu_absensi: boolean | null;
};

export function usePostToggleStatusAbsensi() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ payload }: { payload: PayloadStatusAbsen }) => {
			const res = await AxiosClient.post("/presensi/pegawai-absensi", payload);
			return res.data;
		},

		onMutate: () => toast.loading("Memperbarui status absensi..."),

		onSuccess: (data, _vars, toastId) => {
			queryClient.invalidateQueries({ queryKey: ["pegawai-absensi"] });

			toast.update(toastId, {
				render: data?.message || "Status absensi berhasil diperbarui",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});
		},

		onError: (err: any, _vars, toastId) => {
			if (!toastId) return;

			toast.update(toastId, {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});
}
