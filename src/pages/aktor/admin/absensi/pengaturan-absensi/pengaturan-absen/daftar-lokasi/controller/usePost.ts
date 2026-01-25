import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { DaftarLokasiSchema } from "../model";
import AxiosClient from "@/provider/axios";

export function usePostDaftarLokasi() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof DaftarLokasiSchema>>({
		resolver: zodResolver(DaftarLokasiSchema),
		mode: "onSubmit",
		defaultValues: {
			latitude: "-6.193125",
			longtitude: "106.821810",
		},
	});

	const mutation = useMutation({
		mutationFn: async (payload: any) => {
			const res = await AxiosClient.post("/presensi/lokasi", payload);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Menyimpan data Daftar Lokasi...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["lokasi"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Daftar Lokasi",
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
			latitude: Number(values?.latitude),
			longtitude: Number(values?.longtitude),
			radius: Number(values?.radius),
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
