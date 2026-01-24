import type { UseFormReturn } from "react-hook-form";
import clsx from "clsx";
import { FaUpload } from "react-icons/fa";
import { usePostUploadFile } from "@/layouts/main-layout/hooks";
import { JokoAddPhoto } from "@/assets/icons/JokoAddPhoto";
import type { ProfilOrganisasiFormValues } from "../model";

export function FormUploadPhoto({
	disabled,
	form,
	name,
	label,
}: {
	form: UseFormReturn<ProfilOrganisasiFormValues>;
	disabled: boolean;
	name: "photo_sekolah";
	label: string;
}) {
	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();

	const loading = disabled || loadingUpload;

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: name, file });
	};

	return (
		<>
			<div className="flex flex-col w-fit">
				<div className={clsx("whitespace-nowrap flex flex-col gap-2")}>
					<label
						className={clsx(
							"flex items-center justify-center flex-col gap-4 rounded-md",
						)}
					>
						{form.watch(name) ? (
							<div className="flex flex-col gap-2">
								<img
									src={form.watch(name) || ""}
									alt={label}
									className="w-32 h-32 rounded-md bg-[#F6FFF5]"
								/>
								<div className="flex items-center justify-center">
									<div className="flex items-center gap-2 py-1.5 px-4 text-xs w-fit border border-#DFDFDF] rounded-full">
										<FaUpload />
										Ganti File
									</div>
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-2">
								<div className="flex flex-col w-32 h-32 bg-[#F6FFF5] border border-[#DFDFDF] gap-2 items-center justify-center">
									<JokoAddPhoto />
								</div>
								<div className="flex flex-col justify-center gap-2">
									<p className="font-medium">{label}</p>
									<ol className="list-disc text-xs text-primary font-light ml-4">
										<li>Max 2MB</li>
										<li>Berjenis .jpg/.jpeg/,png</li>
									</ol>
									<div className="flex items-center text-[#1E5916] cursor-pointer gap-2 py-1.5 px-4 text-xs w-fit border border-#DFDFDF] rounded-full">
										<FaUpload />
										Upload
									</div>
								</div>
							</div>
						)}

						<input
							type="file"
							accept="image/*"
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
