import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { usePathname } from "@/utils/usePathname";
import { LaporanSPPDSchema, postLaporanSPPD } from "../model";
import { useGetLaporanSPPD } from "./useGet";
import dayjs from "dayjs";

export function usePostLaporanSPPD() {
	const { fivethPathname } = usePathname();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const { data: selected, loading } = useGetLaporanSPPD();

	const form = useForm<zod.infer<typeof LaporanSPPDSchema>>({
		resolver: zodResolver(LaporanSPPDSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postLaporanSPPD,

		onMutate: () => {
			return toast.loading("Menyimpan data laporan SPPD...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["laporan-sppd"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menyimpan laporan SPPD",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
		},

		onError: (err: any, _variables, toastId) => {
			toast.update(toastId!, {
				render: err?.response?.data?.error || "Terjadi kesalahan",
				type: "error",
				isLoading: false,
				autoClose: 4000,
			});
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		mutation.mutate({
			surat_tugas_id: fivethPathname || "",
			payload: {
				dasar_pelaksanaan: values?.dasar_pelaksanaan,
				isi: values?.isi,
				laporan_pelaksanaan: values?.laporan_pelaksanaan,
				perihal: values?.perihal,
				saran: values?.saran,
				tanggal: values?.tanggal,
				tempat: values?.tempat,
				tindak_lanjut: values?.tindak_lanjut,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				dasar_pelaksanaan: selected?.dasar_pelaksanaan,
				isi: selected?.isi,
				laporan_pelaksanaan: selected?.laporan_pelaksanaan,
				perihal: selected?.perihal,
				saran: selected?.saran,
				tanggal: selected?.tanggal
					? dayjs(selected?.tanggal).locale("id").format("YYYY-MM-DD")
					: "",
				tempat: selected?.tempat,
				tindak_lanjut: selected?.tindak_lanjut,
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
		loading,
	};
}
