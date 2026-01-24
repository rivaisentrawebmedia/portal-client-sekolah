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
					navigate("tambah-user");
				}}
				className="bg-transparent text-xs rounded-full border-[#1E5916] text-[#1E5916]"
			>
				<Plus size={12} />
				Tambah Data
			</Button>
		</>
	);
}
