import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PrestasiSchema, postPrestasi } from "../model";
import { useNavigate } from "react-router-dom";

export function usePostPrestasi() {
	const navigate = useNavigate();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PrestasiSchema>>({
		resolver: zodResolver(PrestasiSchema),
		mode: "onSubmit",
		defaultValues: {
			status: "draft",
		},
	});

	const mutation = useMutation({
		mutationFn: postPrestasi,

		onMutate: () => {
			return toast.loading("Menyimpan data prestasi...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["prestasi"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan prestasi",
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
			kategori_prestasi_id: values.kategori_prestasi_id,
			isi: values.isi,
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
