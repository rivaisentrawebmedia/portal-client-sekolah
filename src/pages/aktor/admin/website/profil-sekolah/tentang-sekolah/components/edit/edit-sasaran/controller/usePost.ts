import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { postSasaranSekolah, SasaranSekolahSchema } from "../model";
import { useGetSasaranSekolah } from "./useGet";

export function usePostSasaranSekolah() {
	const { data: selected } = useGetSasaranSekolah();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof SasaranSekolahSchema>>({
		resolver: zodResolver(SasaranSekolahSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postSasaranSekolah,

		onMutate: () => {
			return toast.loading("Menyimpan data sasaran sekolah...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["sasaran-sekolah"],
			});

			await queryClient.invalidateQueries({
				queryKey: ["tentang-sekolah"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil mengubah sasaran sekolah",
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
			items: values.items,
			gambar: values.gambar,
			isi: values.isi,
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				gambar: selected.gambar,
				isi: selected.isi,
				items: selected.items,
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
