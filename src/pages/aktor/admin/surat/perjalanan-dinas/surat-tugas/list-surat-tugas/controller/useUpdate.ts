import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { SuratTugasSchema, updateSuratTugas } from "../model";
import { toRoman } from "@/utils/helpers";
import dayjs from "dayjs";
import { useGetSuratTugasByID } from "./useGetByID";
import { useNavigate } from "react-router-dom";

export function useUpdateSuratTugas() {
	const navigate = useNavigate();
	const { data: selected, loading } = useGetSuratTugasByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof SuratTugasSchema>>({
		resolver: zodResolver(SuratTugasSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateSuratTugas,

		onMutate: () => {
			return toast.loading("Memperbarui data Surat Tugas...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["surat-tugas"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Surat Tugas",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(-1);
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

	const onSubmit = form.handleSubmit((values) => {
		if (!selected?.id) return;

		mutation.mutate({
			id: selected.id,
			data: {
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
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				bagian_surat_id: selected.bagian_surat_id,
				tanggal_mulai: selected.tanggal_mulai
					? dayjs(selected?.tanggal_mulai).locale("id").format("YYYY-MM-DD")
					: "",
				tanggal_selesai: selected.tanggal_selesai
					? dayjs(selected?.tanggal_selesai).locale("id").format("YYYY-MM-DD")
					: "",
				tanggal_surat: selected.tanggal_surat
					? dayjs(selected?.tanggal_surat).locale("id").format("YYYY-MM-DD")
					: "",
				tempat_kegiatan: selected.tempat_kegiatan || "",
				bulan: selected.tanggal_surat
					? toRoman(
							Number(dayjs(selected?.tanggal_surat).locale("id").format("MM")),
						)
					: "",
				kegiatan: selected.kegiatan,
				kode_belakang: selected.bagian_surat_belakang,
				kode_depan: selected.bagian_surat_depan,
				nomor_surat: selected.nomor_surat,
				tahun: selected.tanggal_surat
					? dayjs(selected?.tanggal_surat).locale("id").format("YYYY")
					: "",
				dasar_surat_tugas: selected.dasar_surat_tugas,
				jabatan_penandatangan_id:
					selected.jabatan_penandatangan_id || undefined,
				list_pegawai: selected.list_pegawai,
				penandatangan_id: selected.penandatangan_id || undefined,
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
	};
}
