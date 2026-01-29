import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { KopSuratSchema, postKopSurat } from "../model";
import { useGetKopSurat } from "./useGet";

export function usePostKopSurat() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const { data: selected, loading } = useGetKopSurat();
	const form = useForm<zod.infer<typeof KopSuratSchema>>({
		resolver: zodResolver(KopSuratSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postKopSurat,

		onMutate: () => {
			return toast.loading("Menyimpan data kop surat...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["kop-surat"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan kop surat",
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
			gaya_font_1: values.gaya_font_1,
			gaya_font_2: values.gaya_font_2,
			gaya_font_3: values.gaya_font_3,
			gaya_font_4: values.gaya_font_4,
			gaya_font_5: values.gaya_font_5,
			gaya_font_6: values.gaya_font_6,
			isi_1: values.isi_1,
			isi_2: values.isi_2,
			isi_3: values.isi_3,
			isi_4: values.isi_4,
			isi_5: values.isi_5,
			isi_6: values.isi_6,
			jenis_font_1: values.jenis_font_1,
			jenis_font_2: values.jenis_font_2,
			jenis_font_3: values.jenis_font_3,
			jenis_font_4: values.jenis_font_4,
			jenis_font_5: values.jenis_font_5,
			jenis_font_6: values.jenis_font_6,
			logo: values.logo,
			ukuran_font_1: values.ukuran_font_1,
			ukuran_font_2: values.ukuran_font_2,
			ukuran_font_3: values.ukuran_font_3,
			ukuran_font_4: values.ukuran_font_4,
			ukuran_font_5: values.ukuran_font_5,
			ukuran_font_6: values.ukuran_font_6,
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				gaya_font_1: selected.gaya_font_1,
				gaya_font_2: selected.gaya_font_2,
				gaya_font_3: selected.gaya_font_3,
				gaya_font_4: selected.gaya_font_4,
				gaya_font_5: selected.gaya_font_5,
				gaya_font_6: selected.gaya_font_6,
				isi_1: selected.isi_1,
				isi_2: selected.isi_2,
				isi_3: selected.isi_3,
				isi_4: selected.isi_4,
				isi_5: selected.isi_5,
				isi_6: selected.isi_6,
				jenis_font_1: selected.jenis_font_1,
				jenis_font_2: selected.jenis_font_2,
				jenis_font_3: selected.jenis_font_3,
				jenis_font_4: selected.jenis_font_4,
				jenis_font_5: selected.jenis_font_5,
				jenis_font_6: selected.jenis_font_6,
				logo: selected.logo,
				ukuran_font_1: selected.ukuran_font_1,
				ukuran_font_2: selected.ukuran_font_2,
				ukuran_font_3: selected.ukuran_font_3,
				ukuran_font_4: selected.ukuran_font_4,
				ukuran_font_5: selected.ukuran_font_5,
				ukuran_font_6: selected.ukuran_font_6,
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
