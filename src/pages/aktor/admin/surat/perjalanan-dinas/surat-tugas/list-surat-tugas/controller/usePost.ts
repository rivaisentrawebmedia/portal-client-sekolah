import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { SuratTugasSchema, postSuratTugas } from "../model";
import { useNavigate } from "react-router-dom";

export function usePostSuratTugas() {
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof SuratTugasSchema>>({
		resolver: zodResolver(SuratTugasSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postSuratTugas,

		onMutate: () => {
			return toast.loading("Menyimpan data Surat Tugas...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["surat-tugas"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Surat Tugas",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(-1);
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
		mutation.mutate({
			bagian_surat_id: values.bagian_surat_id,
			tanggal_mulai: values.tanggal_mulai,
			tanggal_selesai: values.tanggal_selesai,
			tanggal_surat: values.tanggal_surat,
			tempat_kegiatan: values.tempat_kegiatan,
			bulan: values.bulan,
			dasar_surat_tugas: values.dasar_surat_tugas,
			jabatan_penandatangan_id: values.jabatan_penandatangan_id,
			kegiatan: values.kegiatan,
			kode_belakang: values.kode_belakang,
			kode_depan: values.kode_depan,
			list_pegawai: values.list_pegawai,
			nomor_surat: values.nomor_surat,
			penandatangan_id: values.penandatangan_id,
			tahun: values.tahun,
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
