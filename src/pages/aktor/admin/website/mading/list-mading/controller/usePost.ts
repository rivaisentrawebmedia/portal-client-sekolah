import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { MadingSchema, postMading } from "../model";
import { useNavigate } from "react-router-dom";

export function usePostMading() {
	const navigate = useNavigate();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof MadingSchema>>({
		resolver: zodResolver(MadingSchema),
		mode: "onSubmit",
		defaultValues: {
			status: "draft",
		},
	});

	const mutation = useMutation({
		mutationFn: postMading,

		onMutate: () => {
			return toast.loading("Menyimpan data mading...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["mading"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan mading",
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
			kategori_mading_id: values.kategori_mading_id,
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
