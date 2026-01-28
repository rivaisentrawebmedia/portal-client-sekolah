import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	BagianSuratSchema,
	updateBagianSurat,
	type BagianSurat,
} from "../model";

export function useUpdateBagianSurat() {
	const [selected, setSelected] = useState<BagianSurat | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof BagianSuratSchema>>({
		resolver: zodResolver(BagianSuratSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateBagianSurat,

		onMutate: () => {
			return toast.loading("Memperbarui data Bagian Surat...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["bagian-surat"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Bagian Surat",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			setSelected(null);
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
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				kode_belakang: selected?.kode_belakang,
				kode_depan: selected?.kode_depan,
				urutan_bulan: selected?.urutan_bulan?.toString(),
				urutan_kode_belakang: selected?.urutan_kode_belakang?.toString(),
				urutan_kode_depan: selected?.urutan_kode_depan?.toString(),
				urutan_nomor: selected?.urutan_nomor?.toString(),
				urutan_tahun: selected?.urutan_tahun?.toString(),
				format_nomor_surat: selected?.format_nomor_surat,
				is_bulan_romawi: selected?.is_bulan_romawi,
				keterangan: selected?.keterangan,
				perlu_bulan: selected?.perlu_bulan,
				perlu_tahun: selected?.perlu_tahun,
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
		setSelected,
		selected,
	};
}
