import { JokoNewspaper } from "@/assets/icons/JokoNewspaper";
import { useGetBeritaStats } from "../../controller";
import { JokoEye } from "@/assets/icons/JokoEye";
import { JokoClipboard } from "@/assets/icons/JokoClipboard";
import { JokoCheckMarkButton } from "@/assets/icons/JokoCheckMarkButton";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStats() {
	const { data: dataStat, loading: loadingStat } = useGetBeritaStats();

	const listState = [
		{
			title: "Jumlah Berita",
			value: dataStat?.jumlah_berita,
			icon: <JokoNewspaper />,
		},
		{
			title: "Jumlah Dibaca",
			value: dataStat?.jumlah_dibaca,
			icon: <JokoEye />,
		},
		{
			title: "Draft Ditulis",
			value: dataStat?.jumlah_draft,
			icon: <JokoClipboard />,
		},
		{
			title: "Berita Dipublish",
			value: dataStat?.jumlah_publish,
			icon: <JokoCheckMarkButton />,
		},
	];

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{loadingStat
					? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
					: listState.map((item, idx) => (
							<div
								key={idx}
								className="bg-[#F5F9FF] flex flex-col gap-1 cursor-pointer hover:shadow-md duration-300 transition-shadow border border-[#70A6F2] p-3 rounded-md"
							>
								<div className="flex items-center w-10 h-10 justify-center bg-white border rounded-full border-[#70A6F2]">
									{item?.icon}
								</div>
								<p className="text-[#888]">{item?.title}</p>
								<p className="font-medium text-2xl text-primary">
									{item?.value ?? 0}
								</p>
							</div>
						))}
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
