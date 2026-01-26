import { useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Save, X } from "lucide-react";
import { FormData, FormUploadDokumen, FormUploadGambar } from "./components";
import { usePostKegiatanHarian } from "../list-kegiatan-harian/controller";
import { usePathname } from "@/utils/usePathname";

export default function TambahKegiatanHarianPage() {
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();

	const { form, disabled, isShow, onSubmit, setIsShow } =
		usePostKegiatanHarian();

	const onSubmitFunc = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Kegiatan Harian",
							to: `/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian?${params.toString()}`,
						},
						{
							label: "Buat Kegiatan Harian",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">
						Buat Kegiatan Harian
					</p>
				</div>

				<Form {...form}>
					<form
						className="flex flex-col gap-4"
						onSubmit={form.handleSubmit(onSubmitFunc)}
					>
						<div className="rounded-lg border border-primary bg-[#F4F7F4] p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormData form={form} disabled={disabled} />
							</div>
						</div>

						<div className="rounded-lg border border-primary bg-[#F4F7F4] p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormUploadGambar form={form} disabled={disabled} />
							</div>
						</div>

						<div className="rounded-lg border border-primary bg-[#F4F7F4] p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormUploadDokumen form={form} disabled={disabled} />
							</div>
						</div>

						<div className="flex items-center justify-end gap-2">
							<Button
								type="button"
								variant={"outline"}
								onClick={() => {
									navigate(-1);
								}}
								className="gap-1 text-xs"
							>
								<X />
								Batal
							</Button>
							<Button
								onClick={async () => {
									const isValid = await form.trigger();
									if (!isValid) {
										const invalidFields = Object.entries(
											form.formState.errors,
										).map(([field, error]) => ({
											field,
											error: error?.message,
										}));
										return toast.error(invalidFields?.[0]?.error?.toString());
									}
								}}
								type="submit"
								className="gap-1 text-xs"
								variant={"default"}
							>
								<Save size={16} />
								Simpan
							</Button>
						</div>
					</form>
				</Form>
			</div>

			<Dialog open={isShow} onOpenChange={setIsShow}>
				<DialogContent className="w-[95vw] max-w-md rounded-lg p-6 max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Buat Kegiatan Harian</DialogTitle>
						<DialogDescription>
							Apakah anda yakin ingin membuat Kegiatan Harian berikut ini?
						</DialogDescription>
					</DialogHeader>

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
							type="button"
							onClick={() => {
								onSubmit();
							}}
							variant="default"
							disabled={disabled}
						>
							Simpan
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
