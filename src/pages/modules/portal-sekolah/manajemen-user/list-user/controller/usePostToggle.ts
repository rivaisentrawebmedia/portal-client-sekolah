import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AxiosClient from "@/provider/axios";
import { useSearchParams } from "react-router-dom";

type PostTogglePayload = {
	user_id: string;
	modul_id: string;
	is_active: boolean;
};

export function usePostToggle() {
	const [params] = useSearchParams();
	const user_id = params.get("user-id");

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (payload: PostTogglePayload) => {
			const res = await AxiosClient.post(
				"/portal-sekolah/kontrol-akses/modul",
				payload,
			);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data kontrol akses...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["manajemen-user", "kontrol-akses", user_id],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menyimpan kontrol akses",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId!, {
				render:
					err?.response?.data?.error || "Terjadi kesalahan saat menyimpan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	/**
	 * 🔹 Dipanggil langsung dari UI
	 */
	const toggleAkses = (modul_id: string, is_active: boolean) => {
		if (!user_id) return;

		mutation.mutate({
			user_id,
			modul_id,
			is_active,
		});
	};

	return {
		toggleAkses,
		disabled: mutation.isPending,
	};
}
