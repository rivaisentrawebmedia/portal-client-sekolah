import type { KegiatanHarian } from "../model";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { usePathname } from "@/utils/usePathname";

export function ButtonDetail({ rowData }: { rowData?: KegiatanHarian }) {
	const { fivethPathname } = usePathname();
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
									`/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian/${rowData?.id}/detail?${params?.toString()}`,
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
