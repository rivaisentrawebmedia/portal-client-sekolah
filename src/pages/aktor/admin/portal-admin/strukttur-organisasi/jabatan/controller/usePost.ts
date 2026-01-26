import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { JabatanSchema, postPejabat } from "../model";

export function usePostJabatan() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof JabatanSchema>>({
		resolver: zodResolver(JabatanSchema),
		mode: "onSubmit",
		defaultValues: {
			is_mapel: false,
			is_utama: false,
			is_walas: false,
		},
	});

	const mutation = useMutation({
		mutationFn: postPejabat,

		onMutate: () => {
			return toast.loading("Menyimpan data jabatan...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["jabatan"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan jabatan",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
		},

		onError: (err: any, _variables, toastId) => {
			console.log(err);

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
			nama: values.nama,
			is_mapel: values.is_mapel,
			is_utama: values.is_utama,
			is_walas: values.is_walas,
			kelompok_jabatan_id: values.kelompok_jabatan_id,
			mulai: values.mulai,
			pejabat_id: values.pejabat_id,
			selesai: values.selesai,
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
