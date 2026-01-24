import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { ManajemenUserSchema } from "../model";
import AxiosClient from "@/provider/axios";
import { useGetManajemenUserByID } from "./useGetByID";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type UpdatePayload = {
	id: string;
	data: any;
};

export function useUpdateManajemenUser() {
	const navigate = useNavigate();
	const { data: selected, loading: loadingSelected } =
		useGetManajemenUserByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof ManajemenUserSchema>>({
		resolver: zodResolver(ManajemenUserSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/portal-sekolah/user/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data user...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["manajemen-user"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui user",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(
				`/admin/manajemen-user/edit-user/kontrol-akses?user-id=${res?.data?.id}`,
			);
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
				agama_id: values.agama_id,
				alamat: values.alamat,
				email: values.email,
				golongan_darah_id: values.golongan_darah_id,
				jenis_kepegawaian_id: values.jenis_kepegawaian_id,
				jenis_ktk_id: values.jenis_ktk_id,
				konfirmasi_password: values.konfirmasi_password,
				nama: values.nama,
				nip: values.nip || "",
				no_telp: values.no_telp,
				pangkat_golongan_id: values.pangkat_golongan_id,
				password: values.password,
				status_aktif_id: values.status_aktif_id,
				status_menikah: values.status_menikah,
				suku_id: values.suku_id,
				tanggal_lahir: `${values.tahun_lahir}-${values.bulan_lahir}-${values.tanggal_lahir}`,
				tempat_lahir: values.tempat_lahir,
				photo: values.photo || "",
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				agama_id: selected.agama_id,
				alamat: selected.alamat,
				email: selected.email,
				golongan_darah_id: selected.golongan_darah_id,
				jenis_kepegawaian_id: selected.jenis_kepegawaian_id,
				jenis_ktk_id: selected.jenis_ktk_id,
				nip: selected.nip,
				no_telp: selected.no_telp,
				pangkat_golongan_id: selected.pangkat_golongan_id,
				photo: selected.photo || "",
				status_aktif_id: selected.status_aktif_id,
				status_menikah: selected.status_menikah,
				suku_id: selected.suku_id,
				tanggal_lahir: selected.tanggal_lahir
					? dayjs(selected?.tanggal_lahir).locale("id").format("DD")
					: "",
				bulan_lahir: selected.tanggal_lahir
					? dayjs(selected?.tanggal_lahir).locale("id").format("MM")
					: "",
				tahun_lahir: selected.tanggal_lahir
					? dayjs(selected?.tanggal_lahir).locale("id").format("YYYY")
					: "",
				tempat_lahir: selected.tempat_lahir,
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
		selected,
		loadingSelected,
	};
}
