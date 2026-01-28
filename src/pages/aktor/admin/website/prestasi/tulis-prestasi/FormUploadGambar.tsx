import { useRef } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { FaCircleNotch, FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";
import type { PrestasiFormValues } from "../list-prestasi/model";
import { usePostUploadFile } from "@/layouts/main-layout/hooks";

export function FormUploadGambar({
	disabled,
	form,
}: {
	form: UseFormReturn<PrestasiFormValues>;
	disabled: boolean;
}) {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "gambar" as never,
	});

	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();
	const loading = disabled || loadingUpload;

	// 🔑 input file khusus tombol "Tambah gambar"
	const addFileRef = useRef<HTMLInputElement | null>(null);

	// upload untuk item YANG SUDAH ADA
	const handleUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({
			form,
			fields: `gambar.${index}.id`,
			file,
			label: `gambar.${index}.label`,
		});

		e.target.value = "";
	};

	// klik tombol Tambah → buka file picker
	const handleAddClick = () => {
		addFileRef.current?.click();
	};

	// upload untuk gambar BARU
	const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const newIndex = fields.length;

		append({
			id: "",
			label: "",
		});

		// pastikan field sudah ter-register dulu
		setTimeout(async () => {
			await onSubmitUploadFile({
				form,
				fields: `gambar.${newIndex}.id`,
				file,
				label: `gambar.${newIndex}.label`,
			});
		}, 0);

		e.target.value = "";
	};

	return (
		<div className="flex flex-col col-span-1 md:col-span-2 gap-3">
			<p className="text-neutral font-normal text-sm">Gambar</p>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="group relative flex flex-col h-fit rounded-xl border border-gray-200 bg-white"
					>
						<label className={clsx("cursor-pointer")}>
							{form.watch(`gambar.${index}.id`) !== "" ? (
								<div className="relative flex">
									<img
										src={form.watch(`gambar.${index}.id`) || ""}
										alt={`gambar.${index}.label`}
										className="w-full h-fit"
									/>
									<div className="flex items-center gap-2 p-2 absolute top-0 left-0 w-full justify-end">
										<div className="flex items-center text-white justify-center w-[2rem] h-[2rem] bg-yellow-500 rounded-md">
											<FaPencilAlt />
										</div>
										<div
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												remove(index);
											}}
											className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#CD2738] text-white rounded-md"
										>
											<FaTrashAlt />
										</div>
									</div>
								</div>
							) : (
								<div className="flex gap-2 h-full border justify-center items-center p-3 rounded-md bg-white border-[#272CCD] text-[#272CCD]">
									<FaCircleNotch
										className="animate-spin duration-300 transition-all"
										size={14}
									/>
									<p className="text-sm font-medium">Loading ...</p>
								</div>
							)}

							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => handleUpload(e, index)}
								disabled={loading}
							/>
						</label>
					</div>
				))}

				{/* Tombol Tambah gambar (UI TETAP) */}
				<button
					type="button"
					disabled={loading}
					onClick={handleAddClick}
					className="flex gap-2 border justify-center flex-col items-center p-3 rounded-md bg-white border-[#272CCD] text-[#272CCD]"
				>
					<FaPlus size={30} />
					<p className="text-sm font-medium">Tambah Gambar</p>
				</button>

				{/* input file tersembunyi untuk tombol Tambah */}
				<input
					ref={addFileRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleUploadNew}
					disabled={loading}
				/>
			</div>
		</div>
	);
}
