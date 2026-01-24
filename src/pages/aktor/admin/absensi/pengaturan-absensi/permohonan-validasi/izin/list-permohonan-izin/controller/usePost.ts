import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PermohonanIzinSchema, type PermohonanIzinFormValues } from "../model";
import AxiosClient from "@/provider/axios";
import { useNavigate } from "react-router-dom";

export function usePostPermohonanIzin() {
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PermohonanIzinSchema>>({
		resolver: zodResolver(PermohonanIzinSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async (payload: PermohonanIzinFormValues) => {
			const res = await AxiosClient.post("/presensi/pengajuan-izin", payload);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data Permohonan Izin...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengajuan-izin"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Permohonan Izin",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate("/admin/presensi/pengaturan-absensi/permohonan-validasi/izin");
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
			alamat_selama_izin: values.alamat_selama_izin,
			alasan_izin: values.alasan_izin,
			file_izin: values.file_izin,
			jenis_izin_id: values.jenis_izin_id,
			mulai: values.mulai,
			no_telp: values.no_telp,
			pegawai_id: values.pegawai_id,
			selesai: values.selesai,
			status: values.status,
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
