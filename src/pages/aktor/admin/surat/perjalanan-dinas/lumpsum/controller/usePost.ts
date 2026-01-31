import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import { usePathname } from "@/utils/usePathname";
import { LumpsumSPPDSchema, postLumpsumSPPD } from "../model";
import { useGetLumpsumSPPDByID } from "./useGetByID";
import { useNavigate } from "react-router-dom";

export function usePostLumpsumSPPD() {
	const navigate = useNavigate();
	const { fivethPathname, eightthPathname } = usePathname();
	const [isShow, setIsShow] = useState(false);
	const queryClient = useQueryClient();

	const { data: selected, loading } = useGetLumpsumSPPDByID();

	const form = useForm<zod.infer<typeof LumpsumSPPDSchema>>({
		resolver: zodResolver(LumpsumSPPDSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: postLumpsumSPPD,

		onMutate: () => {
			return toast.loading("Menyimpan data Lumpsum SPPD...");
		},

		onSuccess: async (data, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["lumpsum-sppd"],
			});

			toast.update(toastId, {
				render: data?.message || "Berhasil menyimpan Lumpsum SPPD",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			form.reset();
			setIsShow(false);
			navigate(-1);
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
			pegawai_id: eightthPathname || "",
			payload: {
				bendahara_id: values?.bendahara_id,
				items: values?.items?.map((item) => {
					return {
						harga: item?.harga,
						jenis_biaya_id: item?.jenis_biaya_id,
						jenis_transportasi_id: item?.jenis_transportasi_id,
						no_tiket: item?.no_tiket,
						qty: Number(item?.qty),
						redaksi: item?.redaksi,
						ril: item?.ril,
					};
				}),
				jabatan_bendahara_id: values?.jabatan_bendahara_id,
				jabatan_pejabat_id: values?.jabatan_pejabat_id,
				pejabat_id: values?.pejabat_id,
				sumber_dana_id: values?.sumber_dana_id,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				bendahara_id: selected?.bendahara_id,
				items: selected?.items?.map((item) => {
					return {
						harga: Number(item?.harga),
						jenis_biaya_id: item?.jenis_biaya_id,
						jenis_transportasi_id: item?.jenis_transportasi_id,
						no_tiket: item?.no_tiket,
						qty: item?.qty?.toString(),
						redaksi: item?.redaksi,
						ril: item?.ril,
					};
				}),
				jabatan_bendahara_id: selected?.jabatan_bendahara_id,
				jabatan_pejabat_id: selected?.jabatan_pejabat_id,
				pejabat_id: selected?.pejabat_id,
				sumber_dana_id: selected?.sumber_dana_id,
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
