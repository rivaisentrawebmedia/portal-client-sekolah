import type { UseFormReturn } from "react-hook-form";
import clsx from "clsx";
import { FaEdit, FaUpload } from "react-icons/fa";
import { usePostUploadFile } from "@/layouts/main-layout/hooks";
import type { PermohonanIzinFormValues } from "../../list-permohonan-izin/model";
import { cn } from "@/utils/cn";

export function FormUploadPhoto({
	disabled,
	form,
	name,
}: {
	form: UseFormReturn<PermohonanIzinFormValues>;
	disabled: boolean;
	name: "file_izin";
}) {
	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();

	const loading = disabled || loadingUpload;

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: name, file, label: "nama_file" });
	};

	return (
		<>
			<div className="flex flex-col gap-2">
				<p
					style={{
						fontWeight: "lighter",
						letterSpacing: "1px",
					}}
				>
					File Izin
				</p>
				<div className={clsx("whitespace-nowrap flex flex-col gap-2")}>
					<label
						className={clsx(
							"flex items-center justify-center flex-col gap-4 rounded-md",
						)}
					>
						{form.watch(name) ? (
							<div
								className={cn(
									"file:text-foreground gap-2 items-center flex justify-between bg-white placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
									"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
									"aria-invalid:border-destructive aria-invalid:ring-destructive/20",
									// "disabled:pointer-events-none disabled:opacity-50",
									"disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#f2f2f2] disabled:text-[#808080] disabled:border-[#ececec]",
								)}
							>
								<p className="line-clamp-1">
									{form.watch("nama_file") || form.watch("file_izin")}
								</p>
								<FaEdit />
							</div>
						) : (
							<div
								className={cn(
									"file:text-foreground gap-2 items-center flex justify-between bg-white placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
									"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
									"aria-invalid:border-destructive aria-invalid:ring-destructive/20",
									// "disabled:pointer-events-none disabled:opacity-50",
									"disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#f2f2f2] disabled:text-[#808080] disabled:border-[#ececec]",
								)}
							>
								<p>Klik untuk mencari file</p>
								<FaUpload />
							</div>
						)}

						<input
							type="file"
							accept="image/*, .pdf"
							className="hidden"
							onChange={handleUpload}
							disabled={loading}
						/>
					</label>
				</div>
			</div>
		</>
	);
}
