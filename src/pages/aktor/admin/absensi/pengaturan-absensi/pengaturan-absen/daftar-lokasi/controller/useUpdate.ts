import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { DaftarLokasiSchema, type DaftarLokasi } from "../model";
import AxiosClient from "@/provider/axios";

type UpdatePayload = {
	id: string;
	data: any;
};

export function useUpdateDaftarLokasi() {
	const [selected, setSelected] = useState<DaftarLokasi | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof DaftarLokasiSchema>>({
		resolver: zodResolver(DaftarLokasiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/presensi/lokasi/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data Daftar Lokasi...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["lokasi"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Daftar Lokasi",
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
				latitude: Number(values?.latitude),
				longtitude: Number(values?.longtitude),
				radius: Number(values?.radius),
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				latitude: selected?.latitude?.toString(),
				longtitude: selected?.longtitude?.toString(),
				radius: selected?.radius?.toString(),
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
