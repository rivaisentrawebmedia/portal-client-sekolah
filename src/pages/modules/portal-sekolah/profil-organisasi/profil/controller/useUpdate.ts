import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";
import {
	ProfilOrganisasiSchema,
	type ProfilOrganisasiFormValues,
} from "../model";
import AxiosClient from "@/provider/axios";
import { useGetProfilOrganisasi } from "./useGet";

type UpdatePayload = {
	data: ProfilOrganisasiFormValues;
};

export function useUpdateProfilOrganisasi() {
	const { data: selected, loading: loadingProfil } = useGetProfilOrganisasi();
	const [isShow, setIsShow] = useState(false);

	const [isEdit, setIsEdit] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const form = useForm<zod.infer<typeof ProfilOrganisasiSchema>>({
		resolver: zodResolver(ProfilOrganisasiSchema),
		mode: "onSubmit",
	});

	const mutation = useMutation({
		mutationFn: async ({ data }: UpdatePayload) => {
			const res = await AxiosClient.post(
				`/portal-sekolah/profil-organisasi`,
				data,
			);
			return res.data;
		},

		onMutate: () => {
			return toast.loading("Memperbarui data profil organisasi...");
		},

		onSuccess: async (res, _variables, toastId) => {
			await queryClient.invalidateQueries({
				queryKey: ["profil-organisasi"],
			});

			toast.update(toastId, {
				render: res?.message || "Berhasil memperbarui profil organisasi",
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
				alamat_sekolah: values.alamat_sekolah,
				desa_id: values.desa_id,
				email: values.email,
				kabupaten_id: values.kabupaten_id,
				kecamatan_id: values.kecamatan_id,
				kode_wilayah: values.kode_wilayah,
				nama_sekolah: values.nama_sekolah,
				no_telp: values.no_telp,
				npsn_sekolah: values.npsn_sekolah,
				provinsi_id: values.provinsi_id,
				photo_sekolah: values.photo_sekolah,
				url_portal_sekolah: values.url_portal_sekolah,
				url_web: values.url_web,
			},
		});
	});

	useEffect(() => {
		if (selected) {
			form.reset({
				alamat_sekolah: selected.alamat_sekolah,
				desa_id: selected.desa_id,
				email: selected.email,
				kabupaten_id: selected.kabupaten_id,
				kecamatan_id: selected.kecamatan_id,
				kode_wilayah: selected.kode_wilayah,
				nama_sekolah: selected.nama_sekolah,
				no_telp: selected.no_telp,
				npsn_sekolah: selected.npsn_sekolah,
				photo_sekolah: selected.photo_sekolah,
				provinsi_id: selected.provinsi_id,
				url_portal_sekolah: selected.url_portal_sekolah,
				url_web: selected.url_web,
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
