import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import AxiosClient from "@/provider/axios";
import {
	GantiPasswordSchema,
	type GantiPasswordFormValues,
} from "../model/dataSchema";
import type { Profile } from "../model";

type UpdatePayload = {
	data: GantiPasswordFormValues;
};

export function useUpdateProfile() {
	const [selected, setSelected] = useState<Profile | null>(null);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof GantiPasswordSchema>>({
		resolver: zodResolver(GantiPasswordSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ data }: UpdatePayload) => {
			const res = await AxiosClient.post(`/portal-sekolah/profile`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data profile...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["profile"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui profile",
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
		if (!selected) return;

		mutation.mutate({
			data: {
				nama: values.nama,
				email: values.email,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				nama: selected.nama,
				email: selected.email,
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
