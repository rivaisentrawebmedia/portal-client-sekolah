import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { JamMasukSchema, postJamMasuk, type JamMasuk } from "../model";

export function usePostJamMasuk() {
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const [selected, setSelected] = useState<JamMasuk | null>(null);

	const form = useForm<zod.infer<typeof JamMasukSchema>>({
		resolver: zodResolver(JamMasukSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postJamMasuk,

		onMutate: () => {
			return toast.loading("Menyimpan data Daftar pengaturan-absensi-hari...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["pengaturan-absensi-hari"],
			});

			toast.update(toastId, {
				render:
					data?.message ||
					"Berhasil menambahkan Daftar pengaturan-absensi-hari",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			setSelected(null);
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
			hari: values.hari,
			is_libur: values.is_libur,
			jam_akhir_absen_masuk: values.jam_akhir_absen_masuk,
			jam_akhir_absen_pulang: values.jam_akhir_absen_pulang,
			jam_masuk: values.jam_masuk,
			jam_mulai_absen_masuk: values.jam_mulai_absen_masuk,
			jam_mulai_absen_pulang: values.jam_mulai_absen_pulang,
			jam_pulang: values.jam_pulang,
			toleransi_keterlambatan: Number(values.toleransi_keterlambatan),
			toleransi_pulang_cepat: Number(values.toleransi_pulang_cepat),
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				hari: selected.hari,
				is_libur: selected.is_libur,
				jam_akhir_absen_masuk: selected.jam_akhir_absen_masuk?.slice(0, 5),
				jam_akhir_absen_pulang: selected.jam_akhir_absen_pulang?.slice(0, 5),
				jam_masuk: selected.jam_masuk?.slice(0, 5),
				jam_mulai_absen_masuk: selected.jam_akhir_absen_masuk?.slice(0, 5),
				jam_mulai_absen_pulang: selected.jam_mulai_absen_pulang?.slice(0, 5),
				jam_pulang: selected.jam_pulang?.slice(0, 5),
				toleransi_keterlambatan: selected.toleransi_keterlambatan?.toString(),
				toleransi_pulang_cepat: selected.toleransi_pulang_cepat?.toString(),
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
		setSelected,
	};
}
