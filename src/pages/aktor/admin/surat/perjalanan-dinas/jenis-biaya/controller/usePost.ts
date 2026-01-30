import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { JenisBiayaSchema, postJenisBiaya } from "../model";

export function usePostJenisBiaya() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof JenisBiayaSchema>>({
		resolver: zodResolver(JenisBiayaSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postJenisBiaya,

		onMutate: () => {
			return toast.loading("Menyimpan data Jenis Biaya...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jenis-biaya"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Jenis Biaya",
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
			kode: values?.kode,
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
