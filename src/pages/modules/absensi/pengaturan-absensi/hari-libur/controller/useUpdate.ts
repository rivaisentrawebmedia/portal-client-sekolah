import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	HariLiburSchema,
	type HariLibur,
	type HariLiburFormValues,
} from "../model";
import AxiosClient from "@/provider/axios";
import dayjs from "dayjs";

type UpdatePayload = {
	id: string;
	data: HariLiburFormValues;
};

export function useUpdateHariLibur() {
	const [selected, setSelected] = useState<HariLibur | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof HariLiburSchema>>({
		resolver: zodResolver(HariLiburSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/presensi/hari-libur/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data Hari Libur...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["hari-libur"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Hari Libur",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			setSelected(null);
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId || "", {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		if (!selected?.id) return;

		mutation.mutate({
			id: selected.id,
			data: {
				nama: values.nama,
				tanggal_mulai: values?.tanggal_mulai,
				tanggal_akhir: values?.tanggal_akhir,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,

				tanggal_mulai: selected?.tanggal_mulai
					? dayjs(selected?.tanggal_mulai).locale("id").format("YYYY-MM-DD")
					: "",
				is_lebih_sehari: selected?.tanggal_akhir ? true : false,
				tanggal_akhir: selected?.tanggal_akhir
					? dayjs(selected?.tanggal_akhir).locale("id").format("YYYY-MM-DD")
					: "",
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
		setSelected,
		selected,
	};
}
