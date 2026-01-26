import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ResetPasswordSchema, updatePassword } from "../model";

export function useUpdateGantiPassword() {
	const navigate = useNavigate();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updatePassword,

		onMutate: () => {
			return toast.loading("Memperbarui data password...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["GantiPassword"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui password",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			Cookies.remove("token");

			navigate("/login");
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
		mutation.mutate({
			data: {
				konfirmasi_password_baru: values.konfirmasi_password_baru,
				password_baru: values.password_baru,
				password_lama: values.password_lama,
			},
		});
	});

	return {
		form,
		isShow,
		setIsShow,
		onSubmit,
		disabled: mutation.isPending,
	};
}
