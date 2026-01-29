import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ButtonTambah() {
	const navigate = useNavigate();
	return (
		<>
			<Button
				type="button"
				onClick={() => {
					navigate("tambah");
				}}
				variant={"outline"}
				className="border-[#276CCD] text-[#276CCD]"
			>
				<Plus />
				Buat Surat Tugas
			</Button>
		</>
	);
}
