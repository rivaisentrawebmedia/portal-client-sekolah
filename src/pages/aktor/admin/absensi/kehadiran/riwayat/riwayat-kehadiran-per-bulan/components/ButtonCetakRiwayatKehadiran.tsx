import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";

export function ButtonCetakRiwayatKehadiran() {
	return (
		<>
			<Button type="button" disabled>
				<FaPrint />
				Cetak Riwayat Kehadiran
			</Button>
		</>
	);
}
