import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { KegiatanHarianSchema, postKegiatanHarian } from "../model";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { usePathname } from "@/utils/usePathname";

export function usePostKegiatanHarian() {
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const navigate = useNavigate();

	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof KegiatanHarianSchema>>({
		resolver: zodResolver(KegiatanHarianSchema),
		mode: "onSubmit",
		defaultValues: {
			valid: true,
		},
	});

	const mutation = useMutation({
		mutationFn: postKegiatanHarian,

		onMutate: () => {
			return toast.loading("Menyimpan data Kegiatan Harian...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["kegiatan-harian"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menambahkan Kegiatan Harian",
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
