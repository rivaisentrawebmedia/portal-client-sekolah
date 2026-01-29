import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import type { Visit } from "../model";
import { usePathname } from "@/utils/usePathname";

export function ButtonDetail({ rowData }: { rowData?: Visit }) {
	const [params] = useSearchParams();
	const { fivethPathname } = usePathname();
	const isRekap = fivethPathname === "rekap-pegawai";

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

								if (isRekap) {
									navigate(
										`/admin/presensi/visit/${rowData?.pegawai_id}/detail?${nextParams.toString()}`,
									);
								} else {
									navigate(
										`${rowData?.pegawai_id}/detail?${nextParams.toString()}`,
									);
								}
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
