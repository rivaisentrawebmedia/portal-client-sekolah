import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	PeriodeCutiSchema,
	type PeriodeCuti,
	type PeriodeCutiFormValues,
} from "../model";
import AxiosClient from "@/provider/axios";
import dayjs from "dayjs";

type UpdatePayload = {
	id: string;
	data: PeriodeCutiFormValues;
};

export function useUpdatePeriodeCuti() {
	const [selected, setSelected] = useState<PeriodeCuti | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PeriodeCutiSchema>>({
		resolver: zodResolver(PeriodeCutiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/presensi/periode-cuti/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data Periode Cuti...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["periode-cuti"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Periode Cuti",
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
				akhir: values?.akhir,
				kode: values?.kode,
				mulai: values?.mulai,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				kode: selected?.kode,
				akhir: selected?.akhir
					? dayjs(selected?.akhir).locale("id").format("YYYY-MM-DD")
					: "",
				mulai: selected?.mulai
					? dayjs(selected?.mulai).locale("id").format("YYYY-MM-DD")
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
