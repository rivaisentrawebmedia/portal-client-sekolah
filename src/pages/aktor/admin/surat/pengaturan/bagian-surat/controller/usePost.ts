import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { BagianSuratSchema, postBagianSurat } from "../model";

export function usePostBagianSurat() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof BagianSuratSchema>>({
		resolver: zodResolver(BagianSuratSchema),
		mode: "onSubmit",
		defaultValues: {
			perlu_bulan: true,
			perlu_tahun: true,
			is_bulan_romawi: true,
		},
	});

	const mutation = useMutation({
		mutationFn: postBagianSurat,

		onMutate: () => {
			return toast.loading("Menyimpan data Bagian Surat...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["bagian-surat"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Bagian Surat",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
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
			kode_belakang: values?.kode_belakang,
			kode_depan: values?.kode_depan,
			urutan_bulan: Number(values?.urutan_bulan),
			urutan_kode_belakang: Number(values?.urutan_kode_belakang),
			urutan_kode_depan: Number(values?.urutan_kode_depan),
			urutan_nomor: Number(values?.urutan_nomor),
			urutan_tahun: Number(values?.urutan_tahun),
			format_nomor_surat: values?.format_nomor_surat,
			is_bulan_romawi: values?.is_bulan_romawi,
			keterangan: values?.keterangan,
			perlu_bulan: values?.perlu_bulan,
			perlu_tahun: values?.perlu_tahun,
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
