import { Button } from "@/components/ui/button";
import { usePathname } from "@/utils/usePathname";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ButtonTambah() {
	const { fivethPathname } = usePathname();

	const [params] = useSearchParams();
	const navigate = useNavigate();

	return (
		<>
			<Button
				variant={"outline"}
				onClick={() => {
					navigate(
						`/admin/presensi/kehadiran/kegiatan-harian/${fivethPathname}/kegiatan-harian/tambah?${params?.toString()}`,
					);
				}}
				className="bg-transparent text-sm rounded-full text-[#1E5916] border-[#1E5916]"
			>
				<Plus size={12} />
				Buat Kegiatan Harian
			</Button>
		</>
	);
}
