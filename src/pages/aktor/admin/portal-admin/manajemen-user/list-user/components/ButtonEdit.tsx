import type { ManajemenUser } from "../model";
import { Pencil } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate } from "react-router-dom";

export function ButtonEdit({ rowData }: { rowData?: ManajemenUser }) {
	const navigate = useNavigate();

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								navigate(`edit-user?user-id=${rowData?.id}`);
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
