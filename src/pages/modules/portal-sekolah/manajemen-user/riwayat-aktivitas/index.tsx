import { ArrowBack } from "@/components/common/ArrowBack";
import { useSearchParams } from "react-router-dom";
import { useGetManajemenUserByID } from "../list-user/controller";
import { DetailUser } from "../tambah-user/kontrol-akses/components";

export default function RiwayatAktivitasPage() {
	const [params] = useSearchParams();

	const { data, loading } = useGetManajemenUserByID();

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<ArrowBack
					link={`/modules/manajemen-user?${params?.toString()}`}
					title="Riwayat Aktivitas"
				/>

				<div className="flex flex-col gap-4 md:flex-row md:items-center ">
					<p className="text-nowrap text-[#1E5916]">Informasi User</p>
					<hr className="border-t w-full" />
				</div>

				<DetailUser data={data} loading={loading} />
			</div>
		</>
	);
}
