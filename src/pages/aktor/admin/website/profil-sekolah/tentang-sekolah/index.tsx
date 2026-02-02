import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetTentangSekolah } from "./controller";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/utils/helpers";
import { BasicLabel } from "@/components/common/BasicLabel";
import dayjs from "dayjs";
import { TentangSekolahSkeleton, VisiMisi } from "./components";

export default function TentangSekolahPage() {
	const navigate = useNavigate();
	const { data, loading } = useGetTentangSekolah();

	if (loading) {
		return <TentangSekolahSkeleton />;
	}

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<p className="text-2xl font-medium">Tentang Sekolah</p>
					<Button
						type="button"
						onClick={() => {
							navigate("edit");
						}}
						variant={"outline"}
						className="border-[#276CCD] text-[#276CCD] hover:text-[#276CCD]"
					>
						<Pencil />
						Edit Data
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<p className="text-nowrap text-[#276CCD] font-medium">
						Identitas Sekolah
					</p>
					<Separator />
				</div>

				<div className="flex flex-col gap-4 md:flex-row">
					{data?.foto_pimpinan ? (
						<img
							src={data?.foto_pimpinan}
							className="w-[240px] h-[320px] rounded-md"
							alt={data?.nama}
						/>
					) : (
						<div className="flex items-center bg-[#0e4087] text-2xl text-white justify-center w-[240px] h-[320px] rounded-md">
							{getInitials(data?.foto_pimpinan || "")}
						</div>
					)}
					<div className="flex flex-col gap-3 flex-1">
						<BasicLabel
							label="Nama"
							value={data?.nama || "-"}
							labelClassName="text-[#888] text-xs"
							valueClassName="text-[#276CCD] font-medium text-lg"
						/>
						<BasicLabel
							label="Kode"
							value={data?.kode || "-"}
							labelClassName="text-[#888] text-xs"
						/>
						<BasicLabel
							label="SK Pendirian"
							value={data?.sk_pendirian || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Tanggal SK Pendirian"
							value={
								data?.sk_pendirian
									? dayjs(data?.sk_pendirian)
											.locale("id")
											.format("DD MMMM YYYY")
									: ""
							}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="SK Operasional"
							value={data?.sk_operasional || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Tanggal SK Operasional"
							value={
								data?.tanggal_sk_operasional
									? dayjs(data?.tanggal_sk_operasional)
											.locale("id")
											.format("DD MMMM YYYY")
									: ""
							}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Akreditasi"
							value={data?.akreditasi || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Tanggal Berlaku Akreditasi"
							value={
								<p>
									{data?.akreditasi_mulai
										? dayjs(data?.akreditasi_mulai)
												.locale("id")
												.format("DD MMMM YYYY")
										: ""}{" "}
									s.d{" "}
									{data?.akreditasi_sampai
										? dayjs(data?.akreditasi_sampai)
												.locale("id")
												.format("DD MMMM YYYY")
										: ""}{" "}
								</p>
							}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Penyelenggaraan"
							value={
								data?.penyelenggaraan?.map((item) => item).join(", ") || "-"
							}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Waktu Penyelenggaraan"
							value={
								<p>
									{data?.jam_mulai?.slice(0, 5)} s.d{" "}
									{data?.jam_selesai?.slice(0, 5)}
								</p>
							}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Alamat"
							value={data?.alamat || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Email"
							value={data?.email || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Telepon"
							value={data?.telepon || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="Nama Pimpinan"
							value={data?.nama_pimpinan || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
						<BasicLabel
							label="NIP Pimpinan"
							value={data?.nip_pimpinan || "-"}
							className="flex flex-col gap-0 md:flex-row"
							labelClassName="md:w-1/4"
						/>
					</div>
				</div>

				<VisiMisi
					gambar={data?.tujuan?.gambar || ""}
					isi={data?.tujuan?.isi}
					items={data?.tujuan?.items}
					nama="Tujuan"
				/>
				<VisiMisi
					gambar={data?.sasaran?.gambar || ""}
					isi={data?.sasaran?.isi}
					items={data?.sasaran?.items}
					nama="Sasaran"
				/>
				<VisiMisi
					gambar={data?.hasil?.gambar || ""}
					isi={data?.hasil?.isi}
					items={data?.hasil?.items}
					nama="Hasil"
				/>
			</div>
		</>
	);
}
