import { InputCommon, SelectCommon } from "@/components/common/basic-input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetKelompok } from "../../kelompok/controller";
import { useGetManajemenUser } from "../../../manajemen-user/list-user/controller";
import { RadioCommon } from "@/components/common/basic-input/RadioCommon";
import { getInitials } from "@/utils/helpers";

export function FormJabatan({
	form,
	disabled,
	onSubmit,
	setIsShow,
}: {
	form: UseFormReturn<any>;
	onSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined,
	) => Promise<void>;
	disabled: boolean;
	setIsShow: (value: React.SetStateAction<boolean>) => void;
}) {
	const { data: kelompokOptions, loading: loadingKelompok } = useGetKelompok({
		page: 1,
	});

	const { data: userOptions, loading: loadingUser } = useGetManajemenUser({
		page: 1,
	});

	const pejabat_id = form.watch("pejabat_id");

	const selected = userOptions?.find((item) => item?.id === pejabat_id);

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<SelectCommon
					form={form}
					name="kelompok_jabatan_id"
					disabled={disabled || loadingKelompok}
					isLoading={loadingKelompok}
					label="Kelompok*"
					placeholder="Pilih Kelompok"
					isMulti={false}
					options={
						kelompokOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="md:w-1/3 w-full"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				<InputCommon
					form={form}
					name="nama"
					disabled={disabled}
					label="Nama*"
					placeholder="Nama"
					className="flex flex-col md:flex-row md:items-center gap-2"
					labelClassname="md:w-1/3 w-full"
				/>

				<SelectCommon
					form={form}
					name="pejabat_id"
					disabled={disabled || loadingUser}
					isLoading={loadingUser}
					label="Pejabat Saat Ini*"
					placeholder="Pilih Pejabat"
					isMulti={false}
					options={
						userOptions?.map((item) => {
							return {
								label: item?.nama,
								value: item?.id,
							};
						}) || []
					}
					labelClassName="md:w-1/3 w-full"
					className="flex flex-col gap-2 md:flex-row"
					selectClassName="flex-1"
				/>

				{pejabat_id && (
					<div className="flex p-3 bg-[#F6FFF5] rounded-md gap-2">
						{selected?.photo ? (
							<img
								src={selected?.photo}
								alt=""
								className="w-9 h-9 rounded-full"
							/>
						) : (
							<div className="flex items-center w-9 h-9 justify-center bg-primary rounded-full text-white">
								{getInitials(selected?.nama || "")}
							</div>
						)}
						<div className="flex flex-col">
							<p>{selected?.nama || "-"}</p>
							<p className="text-xs text-primary">{selected?.jabatan || "-"}</p>
						</div>
					</div>
				)}

				<RadioCommon
					form={form}
					name="is_utama"
					label="Apakah Pemimpin Utama?"
					options={[
						{ label: "Ya", value: true },
						{ label: "Tidak", value: false },
					]}
					labelClassname="md:w-1/3 w-full"
					className="flex flex-col gap-2 md:flex-row"
					disabled={disabled}
				/>

				<RadioCommon
					form={form}
					name="is_mapel"
					label="Apakah Guru Mata Pelajaran?"
					options={[
						{ label: "Ya", value: true },
						{ label: "Tidak", value: false },
					]}
					labelClassname="md:w-1/3 w-full"
					className="flex flex-col gap-2 md:flex-row"
					disabled={disabled}
				/>

				<RadioCommon
					form={form}
					name="is_walas"
					label="Apakah Wali Kelas?"
					options={[
						{ label: "Ya", value: true },
						{ label: "Tidak", value: false },
					]}
					labelClassname="md:w-1/3 w-full"
					className="flex flex-col gap-2 md:flex-row"
					disabled={disabled}
				/>

				<InputCommon
					form={form}
					name="mulai"
					disabled={disabled}
					label="TMT*"
					className="flex flex-col md:flex-row md:items-center gap-2"
					labelClassname="md:w-1/3 w-full"
					type="date"
				/>

				<InputCommon
					form={form}
					name="selesai"
					disabled={disabled}
					label="Tanggal Akhir Menjabat*"
					className="flex flex-col md:flex-row md:items-center gap-2"
					labelClassname="md:w-1/3 w-full"
					type="date"
				/>

				<DialogFooter className="flex gap-2 justify-end">
					<Button
						type="button"
						variant="outline"
						disabled={disabled}
						onClick={() => setIsShow(false)}
					>
						Batal
					</Button>

					<Button
						onClick={async () => {
							const isValid = await form.trigger();
							if (!isValid) {
								const invalidFields = Object.entries(form.formState.errors).map(
									([field, error]) => ({
										field,
										error: error?.message,
									}),
								);
								return toast.error(invalidFields?.[0]?.error?.toString());
							}
						}}
						type="submit"
						variant="default"
						disabled={disabled}
					>
						Simpan
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
