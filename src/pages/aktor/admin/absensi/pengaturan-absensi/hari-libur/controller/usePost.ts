import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { HariLiburSchema, type HariLiburFormValues } from "../model";
import AxiosClient from "@/provider/axios";

export function usePostHariLibur() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof HariLiburSchema>>({
		resolver: zodResolver(HariLiburSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async (payload: HariLiburFormValues) => {
			const res = await AxiosClient.post("/presensi/hari-libur", payload);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data Hari Libur...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["hari-libur"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Hari Libur",
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
			tanggal_mulai: values?.tanggal_mulai,
			tanggal_akhir: values?.tanggal_akhir,
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
