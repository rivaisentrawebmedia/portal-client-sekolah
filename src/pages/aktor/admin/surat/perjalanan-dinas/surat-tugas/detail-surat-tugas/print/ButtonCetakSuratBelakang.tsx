import { FaPrint } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { SuratTugasByID } from "../../list-surat-tugas/model";
import dayjs from "dayjs";
import { MenubarItem } from "@/components/ui/menubar";
import {
	generatePdfSuratTugasBelakang,
	type SuratTugasBelakang,
} from "./generatePDFSuratBelakang";

(pdfMake as any).vfs = pdfFonts.vfs;

export function ButtonCetakSuratBelakang({
	detailSuratTugas,
}: {
	detailSuratTugas: SuratTugasByID;
}) {
	const dataSuratTugasBelakang: SuratTugasBelakang = {
		list_pegawai:
			detailSuratTugas?.list_pegawai?.map((item) => {
				return {
					pegawai_id: item?.pegawai_id || "",
					jabatan_kegiatan: item?.jabatan_kegiatan || "",
					urutan: Number(item?.urutan || 0),
					nama: item?.nama || "",
					nip: item?.nip || "",
					tanggal_keberangkatan: item?.tanggal_keberangkatan
						? dayjs(item?.tanggal_keberangkatan)
								.locale("id")
								.format("DD MMMM YYYY")
						: "-",
					tanggal_kepulangan: item?.tanggal_kepulangan
						? dayjs(item?.tanggal_kepulangan)
								.locale("id")
								.format("DD MMMM YYYY")
						: "-",
				};
			}) || [],
		nama_pejabat: detailSuratTugas?.penandatangan || "-",
		nip_pejabat: detailSuratTugas?.nip_penandatangan || "",
		tempat_kedudukan: detailSuratTugas?.tempat_asal || "-",
		tempat_tujuan: detailSuratTugas?.tempat_tujuan || "-",
		tanggal_pergi: dayjs(detailSuratTugas?.tanggal_mulai)
			.locale("id")
			.format("DD MMMM YYYY"),
		tanggal_pulang: dayjs(detailSuratTugas?.tanggal_selesai)
			.locale("id")
			.format("DD MMMM YYYY"),
		penandatang: detailSuratTugas?.penandatangan || "",
		jabatan_penandatanga: detailSuratTugas?.jabatan_penandatangan || "-",
		nip_penandatangan: detailSuratTugas?.nip_penandatangan || "",
	};

	const handlePrintSuratTugasBelakang = () => {
		pdfMake
			.createPdf(generatePdfSuratTugasBelakang(dataSuratTugasBelakang))
			.print();
	};

	return (
		<>
			<MenubarItem
				onClick={() => {
					handlePrintSuratTugasBelakang();
				}}
			>
				<FaPrint color="#888" />
				Cetak Belakang
			</MenubarItem>
		</>
	);
}
