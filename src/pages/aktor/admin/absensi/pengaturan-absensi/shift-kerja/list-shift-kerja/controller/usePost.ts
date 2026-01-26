import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { postShiftKerja, ShiftKerjaSchema } from "../model";
import { useNavigate } from "react-router-dom";

export function usePostShiftKerja() {
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof ShiftKerjaSchema>>({
		resolver: zodResolver(ShiftKerjaSchema),
		mode: "onSubmit",
		defaultValues: {
			is_wajib_foto: true,
			is_wajib_isi_rencana_kegiatan: true,
			is_wajib_presensi_di_lokasi: true,
			is_wajib_realisasi_kegiatan: true,
		},
	});

	const mutation = useMutation({
		mutationFn: postShiftKerja,

		onMutate: () => {
			return toast.loading("Menyimpan data Shift Kerja...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["shift-kerja"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Shift Kerja",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(`/admin/presensi/pengaturan-absensi/shift-kerja`);
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
