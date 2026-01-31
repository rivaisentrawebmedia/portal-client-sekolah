import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postDokumentasiSPPD } from "../model";
import { usePathname } from "@/utils/usePathname";

export function usePostDokumentasiSPPD() {
	const queryClient = useQueryClient();
	const { fivethPathname } = usePathname();

	const mutation = useMutation({
		mutationFn: (file: File) =>
			postDokumentasiSPPD({
				file,
				surat_tugas_id: fivethPathname || "",
			}),

		onMutate: () => toast.loading("Mengunggah gambar..."),

		onSuccess: async (_, __, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["dokumentasi-sppd"],
			});

			toast.update(toastId!, {
				render: "Dokumentasi berhasil diunggah",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});
		},

		onError: (err: any, _, toastId) => {
			toast.update(toastId!, {
				render: err?.response?.data?.message || "Gagal mengunggah dokumentasi",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		},
	});

	return {
		submit: mutation.mutate,
		loading: mutation.isPending,
	};
}
