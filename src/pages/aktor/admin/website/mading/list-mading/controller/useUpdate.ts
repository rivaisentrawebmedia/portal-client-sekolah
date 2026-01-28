import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { MadingSchema, updateMading } from "../model";
import { useNavigate } from "react-router-dom";
import { useGetMadingByID } from "./useGetByID";
import dayjs from "dayjs";

export function useUpdateMading() {
	const navigate = useNavigate();
	const { data: selected } = useGetMadingByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof MadingSchema>>({
		resolver: zodResolver(MadingSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateMading,

		onMutate: () => {
			return toast.loading("Memperbarui data mading...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["mading"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui mading",
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
				kategori_mading_id: values.kategori_mading_id,
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
				kategori_mading_id: selected.kategori_mading_id,
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
