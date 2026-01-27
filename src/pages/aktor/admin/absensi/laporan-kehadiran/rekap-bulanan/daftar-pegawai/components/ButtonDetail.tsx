import { Link, useSearchParams } from "react-router-dom";
import type { RekapBulanan } from "../model";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";

export function ButtonDetail({ item }: { item: RekapBulanan }) {
	const [params] = useSearchParams();
	const tahun = params?.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = params?.get("bulan") || dayjs().locale("id").format("MM");
	return (
		<>
			<Link
				to={`${item?.pegawai_id}/rekap-bulanan?user-id=${item?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
				className="bg-[#2769CD] p-1.5 rounded-md text-white"
			>
				<FaInfoCircle />
			</Link>
		</>
	);
}
