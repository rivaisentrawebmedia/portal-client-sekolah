import { Link, useSearchParams } from "react-router-dom";
import type { RekapPerOrang } from "../model";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";

export function ButtonDetail({ item }: { item: RekapPerOrang }) {
	const [params] = useSearchParams();
	const tahun = params?.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = params?.get("bulan") || dayjs().locale("id").format("MM");
	return (
		<>
			<Link
				to={`${item?.pegawai_id}/rekap-per-orang?user-id=${item?.pegawai_id}&tahun=${tahun}&bulan=${bulan}`}
				className="bg-[#2769CD] p-1.5 rounded-md text-white"
			>
				<FaInfoCircle />
			</Link>
		</>
	);
}
