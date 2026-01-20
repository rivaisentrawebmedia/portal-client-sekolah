import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { ManajemenUserSchema } from "../model";
import AxiosClient from "@/provider/axios";
import { useNavigate } from "react-router-dom";

export function usePostManajemenUser() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const form = useForm<zod.infer<typeof ManajemenUserSchema>>({
		resolver: zodResolver(ManajemenUserSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async (payload: any) => {
			const res = await AxiosClient.post("/portal-sekolah/user", payload);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data user...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["manajemen-user"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan user",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(
				`/modules/manajemen-user/tambah-user/kontrol-akses?user-id=${data?.data?.id}`,
			);
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
			agama_id: values.agama_id,
			alamat: values.alamat,
			email: values.email,
			golongan_darah_id: values.golongan_darah_id,
			jenis_kepegawaian_id: values.jenis_kepegawaian_id,
			jenis_ktk_id: values.jenis_ktk_id,
			konfirmasi_password: values.konfirmasi_password,
			nama: values.nama,
			nip: values.nip,
			no_telp: values.no_telp,
			pangkat_golongan_id: values.pangkat_golongan_id,
			password: values.password,
			status_aktif_id: values.status_aktif_id,
			status_menikah: values.status_menikah,
			suku_id: values.suku_id,
			tanggal_lahir: `${values.tahun_lahir}-${values.bulan_lahir}-${values.tanggal_lahir}`,
			tempat_lahir: values.tempat_lahir,
			photo: values.photo,
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
