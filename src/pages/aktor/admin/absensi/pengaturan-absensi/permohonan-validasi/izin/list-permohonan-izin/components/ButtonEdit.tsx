import type { PermohonanIzin } from "../model";
import { Pencil } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ButtonEdit({ rowData }: { rowData?: PermohonanIzin }) {
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
									`/admin/presensi/pengaturan-absensi/permohonan-validasi/izin/${rowData?.id}/edit?${params.toString()}`,
								);
							}}
							className="bg-[#CDA327] p-1.5 rounded-md text-white"
						>
							<Pencil size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Edit data</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
