import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	RiwayatKehadiranSchema,
	updateRiwayatKehadiran,
	type RiwayatKehadiranPerBulan,
} from "../model";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

export function useUpdateRiwayatKehadiran() {
	const [params] = useSearchParams();
	const tahun = params.get("tahun");

	const [selected, setSelected] = useState<RiwayatKehadiranPerBulan | null>(
		null,
	);
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof RiwayatKehadiranSchema>>({
		resolver: zodResolver(RiwayatKehadiranSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateRiwayatKehadiran,

		onMutate: () => {
			return toast.loading("Memperbarui data Riwayat Kehadiran...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["kehadiran-per-bulan"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Riwayat Kehadiran",
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
			tahun: tahun || "",
			data: {
				jam_datang: values.jam_datang,
				jam_pulang: values.jam_pulang,
				jenis_presensi: values.jenis_presensi,
				lokasi_datang: values.lokasi_datang,
				lokasi_pulang: values.lokasi_pulang,
				realisasi_pekerjaan: values.realisasi_pekerjaan,
				rencana_pekerjaan: values.rencana_pekerjaan,
				tanggal: values.tanggal,
				nama_file: values.nama_file,
				photo: values.photo,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				jam_datang: selected.jam_datang?.slice(0, 5),
				jam_pulang: selected.jam_pulang?.slice(0, 5),
				jenis_presensi: selected.jenis_presensi,
				lokasi_datang: selected.lokasi_datang,
				lokasi_pulang: selected.lokasi_pulang,
				nama_file: selected.photo,
				photo: selected.photo,
				realisasi_pekerjaan: selected.realisasi_pekerjaan,
				rencana_pekerjaan: selected.rencana_pekerjaan,
				tanggal: selected.tanggal
					? dayjs(selected.tanggal).locale("id").format("YYYY-MM-DD")
					: "",
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
