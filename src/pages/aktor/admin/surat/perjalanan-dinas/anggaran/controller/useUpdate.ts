import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	AnggaranSchema,
	type Anggaran,
	type AnggaranFormValues,
} from "../model";
import AxiosClient from "@/provider/axios";

type UpdatePayload = {
	id: string;
	data: AnggaranFormValues;
};

export function useUpdateAnggaran() {
	const [selected, setSelected] = useState<Anggaran | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof AnggaranSchema>>({
		resolver: zodResolver(AnggaranSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/surat/anggaran/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data Anggaran...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["anggaran"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Anggaran",
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
				jumlah: values?.jumlah,
				tahun: values?.tahun,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				jumlah: Number(selected?.jumlah || 0),
				tahun: selected?.tahun,
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
