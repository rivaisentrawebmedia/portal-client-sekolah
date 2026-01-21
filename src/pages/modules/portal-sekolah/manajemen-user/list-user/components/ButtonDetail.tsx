import type { ManajemenUser } from "../model";
import { History } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate } from "react-router-dom";

export function ButtonDetail({ rowData }: { rowData?: ManajemenUser }) {
	const navigate = useNavigate();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								navigate(`detail-user?user-id=${rowData?.id}`);
							}}
							className="bg-[#2769CD] p-1.5 rounded-md text-white"
						>
							<History size={12} />
						</button>
					</TooltipTrigger>
					<TooltipContent>Riwayat Aktivitas</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
