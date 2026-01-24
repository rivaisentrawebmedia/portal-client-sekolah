import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PermohonanCutiSchema, type PermohonanCutiFormValues } from "../model";
import AxiosClient from "@/provider/axios";
import { useNavigate } from "react-router-dom";

export function usePostPermohonanCuti() {
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PermohonanCutiSchema>>({
		resolver: zodResolver(PermohonanCutiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async (payload: PermohonanCutiFormValues) => {
			const res = await AxiosClient.post("/presensi/pengajuan-cuti", payload);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data Permohonan Cuti...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengajuan-cuti"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Permohonan Cuti",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate("/modules/presensi/pengaturan-absensi/permohonan-validasi/cuti");
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
			alamat_selama_cuti: values.alamat_selama_cuti,
			alasan_cuti: values.alasan_cuti,
			file_cuti: values.file_cuti,
			jenis_cuti_id: values.jenis_cuti_id,
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
