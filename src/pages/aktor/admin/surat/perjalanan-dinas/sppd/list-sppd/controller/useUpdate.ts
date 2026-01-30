import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { EdtSPPDSchema, updateSPPD } from "../model";
import { useNavigate } from "react-router-dom";
import { usePathname } from "@/utils/usePathname";
import { useGetSPP } from "./useGet";
import dayjs from "dayjs";

export function useUpdateSPPD() {
	const { fivethPathname } = usePathname();
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const { data: selected, loading } = useGetSPP();

	const form = useForm<zod.infer<typeof EdtSPPDSchema>>({
		resolver: zodResolver(EdtSPPDSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateSPPD,

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
			let message = "Terjadi kesalahan";

			const detail = err?.response?.data?.detail;

			if (typeof detail === "string") {
				message = detail;
			} else if (typeof detail === "object" && detail !== null) {
				// ambil pesan pertama dari object
				const firstError = Object.values(detail)[0];
				if (firstError) {
					message = String(firstError);
				}
			}

			toast.update(toastId!, {
				render: message,
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		mutation.mutate({
			id: fivethPathname || "",
			data: {
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
				list_pegawai: values.list_pegawai,
				maksud_kegiatan: values?.maksud_kegiatan,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				bagian_surat_id: selected.bagian_surat_id,
				jabatan_penandatangan_id: selected.jabatan_penandatangan_id,
				penandatangan_id: selected.penandatangan_id,
				jenis_transportasi_id: selected.jenis_transportasi_id,
				tanggal_surat: selected.tanggal_surat
					? dayjs(selected?.tanggal_surat).locale("id").format("YYYY-MM-DD")
					: "",
				tempat_asal: selected.tempat_asal,
				tempat_tujuan: selected.tempat_tujuan,
				instansi: selected.instansi,
				akun: selected.akun,
				lain_lain: selected.lain_lain,
				list_pegawai: selected.list_pegawai?.map((item) => {
					return {
						no_sppd: item?.no_sppd,
						pegawai_id: item?.pegawai_id,
						tanggal_keberangkatan: item?.tanggal_keberangkatan
							? dayjs(item?.tanggal_keberangkatan)
									.locale("id")
									.format("YYYY-MM-DD")
							: "",
						tanggal_kepulangan: item?.tanggal_kepulangan
							? dayjs(item?.tanggal_kepulangan)
									.locale("id")
									.format("YYYY-MM-DD")
							: "",
					};
				}),
				maksud_kegiatan: selected?.maksud_kegiatan,
				nomor_surat: selected?.nomor_surat,
				bulan: selected.tanggal_surat
					? dayjs(selected?.tanggal_surat).locale("id").format("MM")
					: "",
				kode_belakang: selected?.bagian_surat_belakang,
				kode_depan: selected?.bagian_surat_depan,
				tahun: selected.tanggal_surat
					? dayjs(selected?.tanggal_surat).locale("id").format("YYYY")
					: "",
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
		loading,
	};
}
