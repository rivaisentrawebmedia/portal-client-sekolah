import { BaseTable } from "@/components/common/BasicTable";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import dayjs from "dayjs";
import type { Pengumuman } from "../model";
import { SlideGambar } from "./SlideGambar";
import { ButtonPublishPengumuman } from "./ButtonPublish";
import { ButtonDetail } from "./ButtonDetail";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonDelete } from "./ButtonDelete";
import { ButtonKembaliKeDraft } from "./ButtonDraft";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface TablePengumumanProps {
	data: Pengumuman[];
	page: number;
	limit: number;
	search: string;
	loading: boolean;
	status: "publish" | "draft";
}

export function TablePengumumanDraft({
	data,
	page,
	limit,
	search,
	loading,
	status,
}: TablePengumumanProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			background="#F5F9FF"
			emptyTitle="Belum ada data Pengumuman"
			emptyDescription="Silakan tambahkan data Pengumuman terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#276CCD]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Gambar",
					className: "font-light text-[#276CCD]",
					render: (item) => <SlideGambar data={item} />,
				},

				{
					header: "Judul",
					className: "font-light text-[#276CCD]",
					render: (item) => <p>{item?.judul || "-"}</p>,
				},
				{
					header: "Tanggal",
					className: "font-light text-[#276CCD]",
					render: (item) => (
						<p>
							{item?.created_at
								? dayjs(item?.created_at)
										.locale("id")
										.format("DD-MM-YYYY HH:mm:ss")
								: "-"}
						</p>
					),
				},
				{
					header: "Kategori",
					className: "font-light text-[#276CCD]",
					render: (item) => <p>{item?.kategori_pengumuman || "-"}</p>,
				},
				{
					header: status === "draft" ? "Terakhir Diedit" : "Tgl. Publish",
					className: "font-light text-[#276CCD]",
					render: (item) => {
						return (
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-0 text-[#888]">
									<p>
										{item?.updated_at
											? dayjs(item?.updated_at)
													.locale("id")
													.format("DD-MM-YYYY")
											: "-"}
									</p>
									<p>
										{item?.updated_at
											? dayjs(item?.updated_at).locale("id").format("HH:mm:ss")
											: "-"}
									</p>
								</div>
								<ButtonPublishPengumuman rowData={item} />
							</div>
						);
					},
				},

				{
					header: "",
					className: "w-[150px]",
					render: (item) => (
						<div className="flex justify-center  gap-2">
							<ButtonDetail rowData={item} />
							{status === "draft" && <ButtonEdit rowData={item} />}
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}

export function TablePengumumanPublish({
	data,
	page,
	limit,
	search,
	loading,
	status,
}: TablePengumumanProps) {
	return (
		<BaseTable
			data={data}
			loading={loading}
			search={search}
			background="#F5F9FF"
			emptyTitle="Belum ada data Pengumuman"
			emptyDescription="Silakan tambahkan data Pengumuman terlebih dahulu"
			columns={[
				{
					header: "#",
					className: "w-[50px] text-center font-light text-[#276CCD]",
					render: (_, idx) => (
						<div className="text-center">{(page - 1) * limit + idx + 1}</div>
					),
				},
				{
					header: "Gambar",
					className: "font-light text-[#276CCD]",
					render: (item) => <SlideGambar data={item} />,
				},

				{
					header: "Judul",
					className: "font-light text-[#276CCD]",
					render: (item) => <p>{item?.judul || "-"}</p>,
				},
				{
					header: "Tanggal",
					className: "font-light text-[#276CCD]",
					render: (item) => (
						<p>
							{item?.created_at
								? dayjs(item?.created_at)
										.locale("id")
										.format("DD-MM-YYYY HH:mm:ss")
								: "-"}
						</p>
					),
				},
				{
					header: "Kategori",
					className: "font-light text-[#276CCD]",
					render: (item) => <p>{item?.kategori_pengumuman || "-"}</p>,
				},
				{
					header: status === "draft" ? "Terakhir Diedit" : "Tgl. Publish",
					className: "font-light text-[#276CCD]",
					render: (item) => {
						return (
							<div className="flex flex-col gap-2">
								<p className="text-[#888]">
									{item?.publish_at ? dayjs(item.publish_at).fromNow() : "-"}
								</p>
								<ButtonKembaliKeDraft rowData={item} />
							</div>
						);
					},
				},

				{
					header: "Dibaca",
					className: "font-light text-[#276CCD]",
					render: (item) => <p>{item?.dibaca || "-"}</p>,
				},

				{
					header: "",
					className: "w-[150px]",
					render: (item) => (
						<div className="flex justify-center  gap-2">
							<ButtonDetail rowData={item} />
							{status === "draft" && <ButtonEdit rowData={item} />}
							<ButtonDelete rowData={item} />
						</div>
					),
				},
			]}
		/>
	);
}
