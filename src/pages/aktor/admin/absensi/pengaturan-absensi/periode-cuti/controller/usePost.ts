import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PeriodeCutiSchema, postPeriodeCuti } from "../model";

export function usePostPeriodeCuti() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PeriodeCutiSchema>>({
		resolver: zodResolver(PeriodeCutiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postPeriodeCuti,

		onMutate: () => {
			return toast.loading("Menyimpan data Periode Cuti...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["periode-cuti"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Periode Cuti",
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
			akhir: values?.akhir,
			kode: values?.kode,
			mulai: values?.mulai,
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
