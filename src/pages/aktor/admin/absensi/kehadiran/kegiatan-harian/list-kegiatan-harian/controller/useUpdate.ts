import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { KegiatanHarianSchema, updateKegiatanHarian } from "../model";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetKegiatanHarianByID } from "./useGetByID";
import { usePathname } from "@/utils/usePathname";

export function useUpdateKegiatanHarian() {
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const { data: selected } = useGetKegiatanHarianByID();
	const [isShow, setIsShow] = useState(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof KegiatanHarianSchema>>({
		resolver: zodResolver(KegiatanHarianSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: updateKegiatanHarian,

		onMutate: () => {
			return toast.loading("Memperbarui data Kegiatan Harian...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["kegiatan-harian"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui Kegiatan Harian",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);

			navigate(
				`/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian?${params?.toString()}`,
			);
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
				jam_keluar: values.jam_keluar,
				jam_masuk: values.jam_masuk,
				pekerjaan: values.pekerjaan,
				status: values.status,
				tanggal: values.tanggal,
				valid: values.valid,
				hari: values.tanggal
					? dayjs(values?.tanggal).locale("id").format("dddd")
					: "",
				lampiran_dokumen: values.lampiran_dokumen,
				lampiran_gambar: values.lampiran_gambar,
				pegawai_id: fivethPathname,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				hari: selected.hari,
				jam_keluar: selected.jam_keluar,
				jam_masuk: selected.jam_masuk,
				lampiran_dokumen: selected.lampiran_dokumen,
				lampiran_gambar: selected.lampiran_gambar,
				pekerjaan: selected.pekerjaan,
				status: selected.status,
				tanggal: selected.tanggal,
				valid: selected.valid,
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
