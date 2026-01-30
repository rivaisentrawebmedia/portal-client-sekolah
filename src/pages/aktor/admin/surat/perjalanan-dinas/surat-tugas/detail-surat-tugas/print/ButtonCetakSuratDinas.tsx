import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";

export function ButtonCetakSuratDinas() {
	return (
		<>
			<Button type="button" className="bg-[#161646] hover:bg-[#161646]/80">
				<FaPrint />
				Cetak Surat Tugas
			</Button>
		</>
	);
}
