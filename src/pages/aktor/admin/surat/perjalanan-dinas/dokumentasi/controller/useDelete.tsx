import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDokumentasiSPPD, type DokumentasiSPPD } from "../model";
import { usePathname } from "@/utils/usePathname";

export function useDeleteDokumentasiSPPD() {
	const { fivethPathname } = usePathname();

	const [isShow, setIsShow] = useState(false);
	const [selected, setSelected] = useState<DokumentasiSPPD | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({
			surat_tugas_id,
			dokumen_id,
		}: {
			surat_tugas_id: string;
			dokumen_id: string;
		}) =>
			deleteDokumentasiSPPD({
				surat_tugas_id,
				dokumen_id,
			}),

		onMutate: () => toast.loading("Menghapus dokumentasi..."),

		onSuccess: async (data, _, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["dokumentasi-sppd"],
			});

			toast.update(toastId!, {
				render: data?.message || "Dokumentasi berhasil dihapus",
				type: "success",
				isLoading: false,
				autoClose: 2500,
			});

			setIsShow(false);
			setSelected(null);
		},

		onError: (err: any, _, toastId) => {
			toast.update(toastId!, {
				render: err?.response?.data?.message || "Gagal menghapus dokumentasi",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		},
	});

	const handleDelete = () => {
		if (!selected?.id || !fivethPathname) return;

		mutation.mutate({
			surat_tugas_id: fivethPathname,
			dokumen_id: selected.id,
		});
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
