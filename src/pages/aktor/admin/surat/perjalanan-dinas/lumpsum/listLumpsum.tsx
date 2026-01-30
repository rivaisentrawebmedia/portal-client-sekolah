import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import { useSearchParams } from "react-router-dom";
import { TableLumpsumSPPD } from "./components";
import { useGetLumpsumSPPD } from "./controller";

export default function ListLumpsumPage() {
	const { fivethPathname } = usePathname();
	const [params] = useSearchParams();
	const { data, loading } = useGetLumpsumSPPD();
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

			<TableLumpsumSPPD
				data={data}
				limit={1000}
				page={1}
				search=""
				loading={loading}
			/>
		</div>
	);
}
