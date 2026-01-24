import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ButtonTambah() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					navigate(
						`/modules/presensi/pengaturan-absensi/permohonan-validasi/izin/tambah-izin?${params.toString()}`,
					);
				}}
				className="bg-transparent text-sm rounded-full text-[#1E5916] border-[#1E5916]"
			>
				<Plus size={12} />
				Buat Permohonan Izin
			</Button>
		</>
	);
}
