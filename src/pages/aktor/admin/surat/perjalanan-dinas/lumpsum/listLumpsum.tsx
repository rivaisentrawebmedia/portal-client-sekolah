import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { TableLumpsumSPPD } from "./components";
import { useGetLumpsumSPPD } from "./controller";
import { useGetKopSurat } from "../../pengaturan/kop-surat/kop-sekolah/controller";
import { useGetProfilOrganisasi } from "../../../portal-admin/profil-organisasi/profil/controller";
import { useGetSuratTugasByID } from "../surat-tugas/list-surat-tugas/controller";

export default function ListLumpsumPage() {
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const { data, loading } = useGetLumpsumSPPD();

	const { data: dataSPPDByID } = useGetSuratTugasByID();
	const { data: dataKopSurat } = useGetKopSurat();
	const { data: dataProfil } = useGetProfilOrganisasi();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
				<ArrowBack
					link={`/admin/surat/perjalanan-dinas/surat-tugas-spd/${fivethPathname}/detail?${params?.toString()}`}
					title="Lumpsum"
					background="#F5F9FF"
					border="#F5F9FF"
					text="#161646"
				/>
			</div>

			{dataSPPDByID && dataKopSurat && dataProfil && (
				<TableLumpsumSPPD
					data={data}
					limit={1000}
					page={1}
					search=""
					loading={loading}
					detailSuratTugas={dataSPPDByID}
					kopSurat={dataKopSurat}
					profil={dataProfil}
				/>
			)}
		</div>
	);
}
