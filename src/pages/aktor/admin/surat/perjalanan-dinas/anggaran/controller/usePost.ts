import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { AnggaranSchema, postAnggaran } from "../model";

export function usePostAnggaran() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof AnggaranSchema>>({
		resolver: zodResolver(AnggaranSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postAnggaran,

		onMutate: () => {
			return toast.loading("Menyimpan data Anggaran...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["anggaran"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Anggaran",
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
			jumlah: values?.jumlah,
			tahun: values?.tahun,
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
