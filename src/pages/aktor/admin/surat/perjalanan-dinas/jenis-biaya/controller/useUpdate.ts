import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { JenisBiayaSchema, updateJenisBiaya, type JenisBiaya } from "../model";

export function useUpdateJenisBiaya() {
	const [selected, setSelected] = useState<JenisBiaya | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof JenisBiayaSchema>>({
		resolver: zodResolver(JenisBiayaSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateJenisBiaya,

		onMutate: () => {
			return toast.loading("Memperbarui data Jenis Biaya...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jenis-biaya"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Jenis Biaya",
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
				kode: values?.kode,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				kode: selected.kode,
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
