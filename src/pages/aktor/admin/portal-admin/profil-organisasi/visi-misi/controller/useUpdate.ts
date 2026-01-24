import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { VisiMisiSchema, type VisiMisiFormValues } from "../model";
import AxiosClient from "@/provider/axios";
import { useGetVisiMisi } from "./useGet";

type UpdatePayload = {
	data: VisiMisiFormValues;
};

export function useUpdateVisiMisi() {
	const { data: selected, loading: loadingProfil } = useGetVisiMisi();
	const [isShow, setIsShow] = useState(false);

	const [isEdit, setIsEdit] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof VisiMisiSchema>>({
		resolver: zodResolver(VisiMisiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ data }: UpdatePayload) => {
			const res = await AxiosClient.post(`/portal-sekolah/visi-misi`, data);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data visi misi...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["visi-misi"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui visi misi",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			setIsEdit(false);
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
		if (!isEdit) {
			return toast.error("Silahkan menekan edit untuk memulai pengeditan data");
		}
		mutation.mutate({
			data: {
				misi: values.misi,
				tujuan: values.tujuan,
				visi: values.visi,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				misi: selected.misi,
				tujuan: selected.tujuan,
				visi: selected.visi,
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
		loadingProfil,
		isEdit,
		setIsEdit,
	};
}
