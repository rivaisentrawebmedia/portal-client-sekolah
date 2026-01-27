import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import type { Visit } from "../model";

export function ButtonDetail({ rowData }: { rowData?: Visit }) {
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
								const nextParams = new URLSearchParams(params.toString());

								nextParams.set("user-id", rowData?.pegawai_id ?? "");

								navigate(`${rowData?.id}/detail?${nextParams.toString()}`);
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
