import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { TentangSekolahSchema, postTentangSekolah } from "../model";
import { useNavigate } from "react-router-dom";
import { useGetTentangSekolah } from "./useGet";
import dayjs from "dayjs";

export function usePostTentangSekolah() {
	const navigate = useNavigate();

	const { data: selected } = useGetTentangSekolah();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof TentangSekolahSchema>>({
		resolver: zodResolver(TentangSekolahSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postTentangSekolah,

		onMutate: () => {
			return toast.loading("Menyimpan data sekolah...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["tentang-sekolah"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil mengubah data sekolah",
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
			akreditasi_id: values.akreditasi_id,
			akreditasi_mulai: values.akreditasi_mulai,
			akreditasi_sampai: values.akreditasi_sampai,
			alamat: values.alamat,
			email: values.email,
			jam_mulai: values.jam_mulai,
			jam_selesai: values.jam_selesai,
			kode: values.kode,
			nama: values.nama,
			nama_pimpinan: values.nama_pimpinan,
			nip_pimpinan: values.nip_pimpinan,
			penyelenggaraan: values.penyelenggaraan,
			sk_operasional: values.sk_operasional,
			sk_pendirian: values.sk_pendirian,
			tanggal_sk_operasional: values.tanggal_sk_operasional,
			tanggal_sk_pendirian: values.tanggal_sk_pendirian,
			telepon: values.telepon,
			foto_pimpinan: values?.foto_pimpinan,
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				akreditasi_id: selected.akreditasi_id,
				akreditasi_mulai: selected.akreditasi_mulai,
				akreditasi_sampai: selected.akreditasi_sampai,
				alamat: selected.alamat,
				email: selected.email,
				jam_mulai: selected.jam_mulai?.slice(0, 5),
				jam_selesai: selected.jam_selesai?.slice(0, 5),
				kode: selected.kode,
				nama: selected.nama,
				nama_pimpinan: selected.nama_pimpinan,
				nip_pimpinan: selected.nip_pimpinan,
				penyelenggaraan: selected.penyelenggaraan,
				sk_operasional: selected.sk_operasional,
				sk_pendirian: selected.sk_pendirian,
				tanggal_sk_operasional: selected.tanggal_sk_operasional
					? dayjs(selected?.tanggal_sk_operasional)
							.locale("id")
							.format("YYYY-MM-DD")
					: "",
				tanggal_sk_pendirian: selected.tanggal_sk_pendirian
					? dayjs(selected?.tanggal_sk_pendirian)
							.locale("id")
							.format("YYYY-MM-DD")
					: "",
				telepon: selected.telepon,
				foto_pimpinan: selected?.foto_pimpinan,
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
	};
}
