import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PermohonanCutiSchema, type PermohonanCutiFormValues } from "../model";
import AxiosClient from "@/provider/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useGetPermohonanCutiByID } from "./useGetByID";

type UpdatePayload = {
	id: string;
	data: PermohonanCutiFormValues;
};

export function useUpdatePermohonanCuti() {
	const navigate = useNavigate();
	const { data: selected } = useGetPermohonanCutiByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PermohonanCutiSchema>>({
		resolver: zodResolver(PermohonanCutiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ id, data }: UpdatePayload) => {
			const res = await AxiosClient.put(`/presensi/pengajuan-cuti/${id}`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data Permohonan Cuti...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengajuan-cuti"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Permohonan Cuti",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(-1);
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
				alamat_selama_cuti: values.alamat_selama_cuti,
				alasan_cuti: values.alasan_cuti,
				file_cuti: values.file_cuti,
				jenis_cuti_id: values.jenis_cuti_id,
				mulai: values.mulai,
				no_telp: values.no_telp,
				pegawai_id: values.pegawai_id,
				selesai: values.selesai,
				status: values.status,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				alamat_selama_cuti: selected.alamat_selama_cuti,
				alasan_cuti: selected.alasan_cuti,
				file_cuti: selected.file_cuti,
				jenis_cuti_id: selected.jenis_cuti_id,
				mulai: selected?.mulai
					? dayjs(selected?.mulai).locale("id").format("YYYY-MM-DD")
					: "",
				no_telp: selected.no_telp,
				pegawai_id: selected.pegawai_id,
				selesai: selected?.selesai
					? dayjs(selected?.selesai).locale("id").format("YYYY-MM-DD")
					: "",
				status: selected.status,
				no_urut: selected?.no_urut?.toString(),
			});
		}
	}, [selected, form]);

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
		selected,
	};
}
