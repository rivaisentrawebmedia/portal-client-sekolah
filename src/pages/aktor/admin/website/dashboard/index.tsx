import { JokoGraduationCap } from "@/assets/icons/JokoGraduationCap";
import { useGetProfile } from "../../portal-admin/profile/controller";
import { useGetDashboard } from "./controllers";
import { JokoTeacher } from "@/assets/icons/JokoTeacher";
import { JokoBooks } from "@/assets/icons/JokoBooks";
import { JokoArtistPallet } from "@/assets/icons/JokoArtistPallet";
import { JokoTrophy } from "@/assets/icons/JokoTrophy";
import { JokoSpiralCalendar } from "@/assets/icons/JokoSpiralCalendar";
import { JokoMegaphone } from "@/assets/icons/JokoMegaphone";
import { JokoNewspaper } from "@/assets/icons/JokoNewspaper";
import { Skeleton } from "@/components/ui/skeleton";

export default function WebsiteDashboardPage() {
	const { data: dataProfile } = useGetProfile();

	const { data: dashboard, loading: loadingDashboard } = useGetDashboard();

	const listState = [
		{
			title: "Jumlah Berita",
			value: dashboard?.jumlah_berita,
			icon: <JokoNewspaper />,
		},
		{
			title: "Jumlah Pengumuman",
			value: dashboard?.jumlah_pengumuman,
			icon: <JokoMegaphone />,
		},
		{
			title: "Jumlah Agenda",
			value: dashboard?.jumlah_agenda,
			icon: <JokoSpiralCalendar />,
		},
		{
			title: "Jumlah Prestasi",
			value: dashboard?.jumlah_prestasi,
			icon: <JokoTrophy />,
		},
		{
			title: "Jumlah Mading",
			value: dashboard?.jumlah_mading,
			icon: <JokoArtistPallet />,
		},
		{
			title: "Jumlah Siswa",
			value: dashboard?.jumlah_siswa,
			icon: <JokoBooks />,
		},
		{
			title: "Jumlah Guru",
			value: dashboard?.jumlah_guru,
			icon: <JokoTeacher />,
		},
		{
			title: "Jumlah Alumni",
			value: dashboard?.jumlah_alumni,
			icon: <JokoGraduationCap />,
		},
	];

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<p className="text-lg">
					Selamat Datang,{" "}
					<span className="font-medium text-[#276CCD]">
						{dataProfile?.nama || "?"}
					</span>
				</p>

				<p className="text-[#276CCD] font-medium">Statistik Konten Anda</p>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{loadingDashboard
						? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
						: listState.map((item, idx) => (
								<div
									key={idx}
									className="bg-[#F5F9FF] flex flex-col gap-1 cursor-pointer hover:shadow-md duration-300 transition-shadow border border-[#276CCD] p-3 rounded-md"
								>
									<div className="flex items-center w-10 h-10 justify-center bg-white border rounded-full border-[#276CCD">
										{item?.icon}
									</div>
									<p className="text-[#888]">{item?.title}</p>
									<p className="font-medium text-2xl text-[#276CCD]">
										{item?.value ?? 0}
									</p>
								</div>
							))}
				</div>
			</div>
		</>
	);
}

function StatSkeleton() {
	return (
		<div className="flex bg-[#F5F9FF] flex-col gap-2 border border-[#276CCD] p-3 rounded-md">
			<Skeleton className="h-10 w-10 rounded-full bg-blue-100" />
			<Skeleton className="h-4 w-24 bg-blue-100" />
			<Skeleton className="h-8 w-16 bg-blue-100" />
		</div>
	);
}
