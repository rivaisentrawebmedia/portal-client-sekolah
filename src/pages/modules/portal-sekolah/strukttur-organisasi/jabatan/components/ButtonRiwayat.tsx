import { Button } from "@/components/ui/button";
import type { Jabatan } from "../model";
import { useNavigate } from "react-router-dom";

export function ButtonRiwayat({ rowData }: { rowData?: Jabatan }) {
	const navigate = useNavigate();
	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					navigate(`${rowData?.id}/riwayat-pejabat`);
				}}
				className="bg-transparent text-sm px-4 py-1.5 rounded-full text-[#1E5916] border-[#1E5916]"
			>
				Riwayat
			</Button>
		</>
	);
}
