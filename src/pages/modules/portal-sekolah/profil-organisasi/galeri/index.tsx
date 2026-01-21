import { Button } from "@/components/ui/button";
import {
	useGetGaleri,
	usePostGaleri,
	usePostUploadFileReturnURL,
} from "./controller";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import { ButtonDelete } from "./components";

function GaleriSkeleton() {
	return (
		<>
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					key={i}
					className="aspect-square w-full animate-pulse rounded-md bg-gray-200"
				/>
			))}
		</>
	);
}

function GaleriEmpty() {
	return (
		<div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-md border border-dashed py-12 text-center">
			<FaCamera className="text-4xl text-gray-400" />
			<p className="text-sm text-gray-500">Belum ada gambar di galeri</p>
			<p className="text-xs text-gray-400">
				Klik <span className="font-medium">Tambah Gambar</span> untuk mengunggah
			</p>
		</div>
	);
}

export default function GaleriOrgnisasiPage() {
	const { data: dataGaleri, loading: loadingGaleri } = useGetGaleri();
	const fileRef = useRef<HTMLInputElement | null>(null);

	const { submitByUrl, disabled } = usePostGaleri();
	const { loading: loadingUpload, onSubmitUploadFile } =
		usePostUploadFileReturnURL();

	const handlePickFile = () => {
		fileRef.current?.click();
	};

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const url = await onSubmitUploadFile(file);
		if (!url) return;

		submitByUrl(url);
		e.target.value = "";
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center gap-4">
				<p className="text-lg font-medium text-[#1E5916]">Galeri Organisasi</p>

				<Button
					type="button"
					onClick={handlePickFile}
					disabled={disabled || loadingUpload}
				>
					<FaCamera />
					Tambah Gambar
				</Button>

				<input
					ref={fileRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleUpload}
				/>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{/* 🔄 Loading */}
				{loadingGaleri && <GaleriSkeleton />}

				{/* 📭 Empty */}
				{!loadingGaleri && dataGaleri?.length === 0 && <GaleriEmpty />}

				{/* 🖼 Data */}
				{!loadingGaleri &&
					dataGaleri?.map((item, idx) => (
						<div
							key={idx}
							className="group relative overflow-hidden rounded-md border"
						>
							<img
								src={item?.gambar}
								alt={item?.created_at}
								className="aspect-square w-full object-cover duration-300 transition-all  group-hover:scale-105"
							/>
							<ButtonDelete rowData={item} />
						</div>
					))}
			</div>
		</div>
	);
}
