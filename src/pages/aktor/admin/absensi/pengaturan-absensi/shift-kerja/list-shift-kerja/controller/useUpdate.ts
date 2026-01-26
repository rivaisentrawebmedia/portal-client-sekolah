import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { ShiftKerjaSchema, updateShiftKerja } from "../model";
import { useNavigate } from "react-router-dom";
import { useGetShiftKerjaByID } from "./useGetByID";

export function useUpdateShiftKerja() {
	const navigate = useNavigate();
	const { data: selected, loading } = useGetShiftKerjaByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof ShiftKerjaSchema>>({
		resolver: zodResolver(ShiftKerjaSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateShiftKerja,

		onMutate: () => {
			return toast.loading("Memperbarui data Shift Kerja...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["shift-kerja"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Shift Kerja",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(`/admin/presensi/pengaturan-absensi/shift-kerja`);
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
				nama: values.nama,
				is_wajib_foto: values?.is_wajib_foto,
				is_wajib_isi_rencana_kegiatan: values?.is_wajib_isi_rencana_kegiatan,
				is_wajib_presensi_di_lokasi: values?.is_wajib_presensi_di_lokasi,
				is_wajib_realisasi_kegiatan: values?.is_wajib_realisasi_kegiatan,
				jam_kerja: values?.jam_kerja?.map((item) => {
					return {
						hari: item?.hari,

						jam_masuk: item?.jam_masuk,
						jam_mulai_absen_masuk: item?.jam_mulai_absen_masuk,
						jam_akhir_absen_masuk: item?.jam_akhir_absen_masuk,
						toleransi_keterlambatan: Number(item?.toleransi_keterlambatan),

						jam_pulang: item?.jam_pulang,
						jam_mulai_absen_pulang: item?.jam_mulai_absen_pulang,
						jam_akhir_absen_pulang: item?.jam_akhir_absen_pulang,
						toleransi_pulang_cepat: Number(item?.toleransi_pulang_cepat),
					};
				}),
				pegawai_id: values?.pegawai_id,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected?.nama,
				is_wajib_foto: selected?.is_wajib_foto,
				is_wajib_isi_rencana_kegiatan: selected?.is_wajib_isi_rencana_kegiatan,
				is_wajib_presensi_di_lokasi: selected?.is_wajib_presensi_di_lokasi,
				is_wajib_realisasi_kegiatan: selected?.is_wajib_realisasi_kegiatan,
				jam_kerja: selected?.jam_kerja?.map((item) => {
					return {
						hari: item?.hari,
						is_libur: item?.is_libur || false,
						jam_akhir_absen_masuk: item?.jam_akhir_absen_masuk,
						jam_akhir_absen_pulang: item?.jam_akhir_absen_pulang,
						jam_masuk: item?.jam_masuk,
						jam_mulai_absen_masuk: item?.jam_mulai_absen_masuk,
						jam_mulai_absen_pulang: item?.jam_mulai_absen_pulang,
						jam_pulang: item?.jam_pulang,
						toleransi_keterlambatan: item?.toleransi_keterlambatan?.toString(),
						toleransi_pulang_cepat: item?.toleransi_pulang_cepat?.toString(),
					};
				}),
				pegawai_id: selected?.pegawai?.map((item) => item?.id),
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
