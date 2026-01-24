import type { MonitoringCuti } from "../model";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

export function ButtonDetail({ rowData }: { rowData?: MonitoringCuti }) {
	const [params] = useSearchParams();

	const navigate = useNavigate();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								navigate(
									`${rowData?.pegawai_id}/detail?${params.toString()}&user-id=${rowData?.pegawai_id}`,
								);
							}}
							className="bg-[#2769cd] p-1.5 rounded-md text-white"
						>
							<FaInfoCircle size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Edit data</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
