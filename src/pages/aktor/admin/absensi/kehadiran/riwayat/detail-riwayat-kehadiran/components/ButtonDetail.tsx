import { Link, useSearchParams } from "react-router-dom";
import type { RiwayatKehadiran } from "../model";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";

export function ButtonDetail({
	rowData,
	pegawai_id,
}: {
	rowData: RiwayatKehadiran;
	pegawai_id: string;
}) {
	const [params] = useSearchParams();

	const tahun = params.get("tahun") || dayjs().locale("id").format("YYYY");
	return (
		<>
			<Link
				to={`${rowData?.bulan}/riwayat-kehadiran-perbulan?user-id=${pegawai_id}&tahun=${tahun}`}
				className="bg-[#2769CD] p-1.5 rounded-md text-white"
			>
				<FaInfoCircle />
			</Link>
		</>
	);
}
