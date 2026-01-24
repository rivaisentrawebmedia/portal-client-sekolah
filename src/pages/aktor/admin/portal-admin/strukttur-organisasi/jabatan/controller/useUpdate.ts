import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { JabatanSchema, type Jabatan, type JabatanFormValues } from "../model";
import AxiosClient from "@/provider/axios";
import dayjs from "dayjs";

type UpdatePayload = {
	id: string;
	data: JabatanFormValues;
};

export function useUpdateJabatan() {
	const [selected, setSelected] = useState<Jabatan | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof JabatanSchema>>({
		resolver: zodResolver(JabatanSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/portal-sekolah/jabatan/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data jabatan...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jabatan"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui jabatan",
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
				is_mapel: values.is_mapel,
				is_utama: values.is_utama,
				is_walas: values.is_walas,
				kelompok_jabatan_id: values.kelompok_jabatan_id,
				mulai: values.mulai,
				pejabat_id: values.pejabat_id,
				selesai: values.selesai,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				is_mapel: selected.is_mapel,
				is_utama: selected.is_utama,
				is_walas: selected.is_walas,
				kelompok_jabatan_id: selected.kelompok_jabatan_id,
				mulai: selected.mulai
					? dayjs(selected?.mulai).locale("id").format("YYYY-MM-DD")
					: "",
				pejabat_id: selected.pejabat_id,
				selesai: selected.selesai
					? dayjs(selected?.selesai).locale("id").format("YYYY-MM-DD")
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
