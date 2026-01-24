import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AxiosClient from "@/provider/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

type ToggleMenuPayload = {
	id: string;
	baca: boolean;
	tulis: boolean;
	ubah: boolean;
	hapus: boolean;
	children?: ToggleMenuPayload[] | null;
};

type PostToggleMenuPayload = {
	user_id: string;
	menu: ToggleMenuPayload[];
};

export function usePostToggleMenu() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const user_id = params.get("user-id");

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (payload: PostToggleMenuPayload) => {
			const res = await AxiosClient.post(
				"/portal-sekolah/kontrol-akses/menu",
				payload,
			);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan hak akses menu...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["manajemen-user", "kontrol-akses-menu", user_id],
			});

			toast.update(toastId!, {
				render: data?.message || "Hak akses menu berhasil disimpan",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			navigate("/admin/manajemen-user");
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId!, {
				render: err?.response?.data?.error || "Gagal menyimpan hak akses menu",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	/**
	 * 🔹 Dipanggil dari UI
	 * menu = FULL menu tree (array)
	 */
	const toggleMenuAkses = (menu: ToggleMenuPayload[]) => {
		if (!user_id) return;

		mutation.mutate({
			user_id,
			menu,
		});
	};

	return {
		toggleMenuAkses,
		isLoading: mutation.isPending,
	};
}
