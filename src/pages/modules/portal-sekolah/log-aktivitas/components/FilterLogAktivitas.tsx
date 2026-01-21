import type { UseFormReturn } from "react-hook-form";
import type { LogAktivitasFormValues } from "../model";
import { JangkaWaktuOptions } from "@/const/listJangkaWaktu";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { useSearchParams } from "react-router-dom";
import { useGetModul } from "../../dashboard/controller";
import { useGetManajemenUser } from "../../manajemen-user/list-user/controller";

export function FilterLogAktivitas({
	form,
}: {
	form: UseFormReturn<LogAktivitasFormValues>;
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const defaultData = {
		label: "Tampilkan Semua",
		value: "tampilkan-semua",
	};

	const jangkaWaktuOptions = [defaultData, ...JangkaWaktuOptions];

	const { data: dataModul, loading: loadingModul } = useGetModul({
		search: undefined,
	});
	const modulOptions = [
		defaultData,
		...(dataModul?.map((item) => {
			return {
				label: item?.nama,
				value: item?.id,
			};
		}) || []),
	];

	const { data: dataUser, loading: loadingUser } = useGetManajemenUser({
		page: 1,
	});
	const userOptions =
		dataUser?.map((item) => {
			return {
				label: item?.nama,
				value: item?.id,
			};
		}) || [];

	return (
		<>
			<Form {...form}>
				<form className="flex gap-4 w-full flex-col">
					<div className="flex flex-col gap-4 md:flex-row w-full">
						<SelectCommon
							form={form}
							name="modul_id"
							placeholder="Pilih Modul"
							isMulti={false}
							disabled={loadingModul}
							isLoading={loadingModul}
							className="w-full md:w-1/4"
							options={modulOptions}
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("modul-id", value);

								setSearchParams(newParams);
							}}
						/>
						<SelectCommon
							form={form}
							name="jangka_waktu"
							placeholder="Pilih Jangka Waktu"
							isMulti={false}
							className="w-full md:w-1/4"
							options={jangkaWaktuOptions}
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("jangka-waktu", value);

								setSearchParams(newParams);
							}}
						/>
					</div>
					<div className="flex flex-col gap-4 md:flex-row w-full md:items-center">
						<SelectCommon
							form={form}
							name="user_id"
							placeholder="Pilih User"
							isMulti={true}
							disabled={loadingUser}
							isLoading={loadingUser}
							className="w-full md:w-1/4"
							options={userOptions}
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set(
									"user-id",
									value?.map((item: string) => item)?.join(", "),
								);

								setSearchParams(newParams);
							}}
						/>
						<p className="flex-1 text-[#2769CD] text-sm">
							{dataUser
								?.filter((item) => form.watch("user_id")?.includes(item?.id))
								?.map((item) => item?.nama)
								?.join(", ")}
						</p>
					</div>
				</form>
			</Form>
		</>
	);
}
