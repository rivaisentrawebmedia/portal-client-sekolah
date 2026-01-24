import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AxiosClient from "@/provider/axios";
import type { Jabatan } from "../model";
import dayjs from "dayjs";

export function usePostToggle() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({ id, payload }: { id: string; payload: Jabatan }) => {
			const res = await AxiosClient.put(
				`/portal-sekolah/jabatan/${id}`,
				payload,
			);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Mengubah status jabatan...");
		},

		onSuccess: async (res, _vars, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jabatan"],
			});

			toast.update(toastId, {
				render: res?.message || "Status berhasil diperbarui",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});
		},

		onError: (err: any, _vars, toastId) => {
			toast.update(toastId || "", {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const toggleAkses = (detail: Jabatan, nextState: boolean) => {
		if (!detail.id) return;

		mutation.mutate({
			id: detail.id,
			payload: {
				...detail,
				is_utama: nextState,
				mulai: detail?.mulai
					? dayjs(detail?.mulai).locale("id").format("YYYY-MM-DD")
					: "",
				selesai: detail?.selesai
					? dayjs(detail?.selesai).locale("id").format("YYYY-MM-DD")
					: "",
			},
		});
	};

	return {
		toggleAkses,
		disabled: mutation.isPending,
	};
}
