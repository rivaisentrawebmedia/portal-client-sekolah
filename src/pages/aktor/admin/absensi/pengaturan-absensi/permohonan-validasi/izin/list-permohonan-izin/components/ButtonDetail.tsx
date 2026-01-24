import type { PermohonanIzin } from "../model";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

export function ButtonDetail({ rowData }: { rowData?: PermohonanIzin }) {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								navigate(
									`/admin/presensi/pengaturan-absensi/permohonan-validasi/izin/${rowData?.id}/detail?user-id=${rowData?.pegawai_id}&${params.toString()}`,
								);
							}}
							className="bg-[#2769cd] p-1.5 rounded-md text-white"
						>
							<FaInfoCircle size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Detail data</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
