import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PengaturanAbsensiSchema, postPengaturanAbsensi } from "../model";
import { useGetPengaturanAbsensi } from "./useGet";

export function usePostPengaturanAbsensi() {
	const { data: selected, loading } = useGetPengaturanAbsensi();

	const [isShow, setIsShow] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PengaturanAbsensiSchema>>({
		resolver: zodResolver(PengaturanAbsensiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postPengaturanAbsensi,

		onMutate: () => {
			return toast.loading("Menyimpan data pengaturan absensi...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengaturan-absensi"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan pengaturan absensi",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			setIsEdit(false);
		},

		onError: (err: any, _variables, toastId) => {
			console.log(err);

			toast.update(toastId || "", {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		if (!isEdit) {
			return;
		}
		mutation.mutate({
			cuti_tahunan: values.cuti_tahunan,
			is_wajib_foto: values.is_wajib_foto,
			is_wajib_isi_rencana_kegiatan: values.is_wajib_isi_rencana_kegiatan,
			is_wajib_presensi_dilokasi: values.is_wajib_presensi_dilokasi,
			is_wajib_realisasi_kegiatan: values.is_wajib_realisasi_kegiatan,
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				cuti_tahunan: selected.cuti_tahunan,
				is_wajib_foto: selected.is_wajib_foto,
				is_wajib_isi_rencana_kegiatan: selected.is_wajib_isi_rencana_kegiatan,
				is_wajib_presensi_dilokasi: selected.is_wajib_presensi_dilokasi,
				is_wajib_realisasi_kegiatan: selected.is_wajib_realisasi_kegiatan,
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending || loading,
		selected,
		isEdit,
		setIsEdit,
	};
}
