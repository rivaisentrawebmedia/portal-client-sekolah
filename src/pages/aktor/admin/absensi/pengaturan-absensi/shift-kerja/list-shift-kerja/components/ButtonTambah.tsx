import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ButtonTambah() {
	const navigate = useNavigate();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					navigate("tambah");
				}}
				className="bg-transparent text-sm rounded-full text-[#1E5916] border-[#1E5916]"
			>
				<Plus size={12} />
				Tambah Shift Kerja
			</Button>
		</>
	);
}
