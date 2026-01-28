import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { BeritaSchema, postBerita } from "../model";
import { useNavigate } from "react-router-dom";

export function usePostBerita() {
	const navigate = useNavigate();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof BeritaSchema>>({
		resolver: zodResolver(BeritaSchema),
		mode: "onSubmit",
		defaultValues: {
			status: "draft",
		},
	});

	const mutation = useMutation({
		mutationFn: postBerita,

		onMutate: () => {
			return toast.loading("Menyimpan data berita...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["berita"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan berita",
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
			judul: values.judul,
			tanggal: values.tanggal,
			kategori_berita_id: values.kategori_berita_id,
			isi: values.isi,
			gambar_utama: values.gambar_utama,
			gambar: values.gambar,
			tag: values.tag,
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
