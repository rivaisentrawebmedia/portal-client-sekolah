import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { postSPPD, SPPDSchema } from "../model";
import { useNavigate } from "react-router-dom";
import { usePathname } from "@/utils/usePathname";

export function usePostSPPD() {
	const { fivethPathname } = usePathname();
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof SPPDSchema>>({
		resolver: zodResolver(SPPDSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postSPPD,

		onMutate: () => {
			return toast.loading("Menyimpan data SPPD...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["sppd"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan SPPD",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(
				`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail`,
			);
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId!, {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		mutation.mutate({
			surat_tugas_id: fivethPathname || "",
			payload: {
				bagian_surat_id: values.bagian_surat_id,
				jabatan_penandatangan_id: values.jabatan_penandatangan_id,
				penandatangan_id: values.penandatangan_id,
				jenis_transportasi_id: values.jenis_transportasi_id,
				tanggal_surat: values.tanggal_surat,
				tempat_asal: values.tempat_asal,
				tempat_tujuan: values.tempat_tujuan,
				instansi: values.instansi,
				akun: values.akun,
				lain_lain: values.lain_lain,
				no_surat: values?.no_surat,
				maksud_kegiatan: values?.maksud_kegiatan,
			},
		});
	});

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
	};
}
