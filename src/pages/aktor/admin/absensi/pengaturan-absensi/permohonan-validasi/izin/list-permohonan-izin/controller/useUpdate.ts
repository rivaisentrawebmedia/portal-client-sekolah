import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { PermohonanIzinSchema, updatePermohonanIzin } from "../model";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useGetPermohonanIzinByID } from "./useGetByID";

export function useUpdatePermohonanIzin() {
	const navigate = useNavigate();
	const { data: selected } = useGetPermohonanIzinByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof PermohonanIzinSchema>>({
		resolver: zodResolver(PermohonanIzinSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updatePermohonanIzin,

		onMutate: () => {
			return toast.loading("Memperbarui data Permohonan Izin...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengajuan-izin"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Permohonan Izin",
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
				alamat_selama_izin: values.alamat_selama_izin,
				alasan_izin: values.alasan_izin,
				file_izin: values.file_izin,
				jenis_izin_id: values.jenis_izin_id,
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
				alamat_selama_izin: selected.alamat_selama_izin,
				alasan_izin: selected.alasan_izin,
				file_izin: selected.file_izin,
				jenis_izin_id: selected.jenis_izin_id,
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
