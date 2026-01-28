import type { Mading } from "../model";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

export function ButtonDetail({ rowData }: { rowData?: Mading }) {
	const navigate = useNavigate();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								navigate(`/admin/website/mading/${rowData?.id}/detail`);
							}}
							className="bg-[#2769CD] p-1.5 rounded-md text-white"
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
