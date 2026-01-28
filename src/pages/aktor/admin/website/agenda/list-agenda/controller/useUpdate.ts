import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { AgendaSchema, updateAgenda } from "../model";
import { useNavigate } from "react-router-dom";
import { useGetAgendaByID } from "./useGetByID";
import dayjs from "dayjs";

export function useUpdateAgenda() {
	const navigate = useNavigate();
	const { data: selected } = useGetAgendaByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof AgendaSchema>>({
		resolver: zodResolver(AgendaSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateAgenda,

		onMutate: () => {
			return toast.loading("Memperbarui data agenda...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["agenda"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui agenda",
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
				judul: values.judul,
				tanggal: values.tanggal,
				kategori_agenda_id: values.kategori_agenda_id,
				isi: values.isi,
				gambar: values.gambar,
				tag: values.tag,
				status: values.status,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				judul: selected.judul,
				tanggal: selected.tanggal
					? dayjs(selected?.tanggal).locale("id").format("YYYY-MM-DD")
					: "",
				kategori_agenda_id: selected.kategori_agenda_id,
				isi: selected.isi,
				gambar: selected.gambar?.map((item) => {
					return {
						id: item?.id,
						label: item?.label,
					};
				}),
				tag: selected.tag?.map((item) => item?.id),
				status: selected.status,
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
