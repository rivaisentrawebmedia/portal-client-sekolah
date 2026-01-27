import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { Link, useSearchParams } from "react-router-dom";
import {
	FilterPegawaiPalingRajinSchema,
	type PegawaiPalingRajin,
} from "./model";
import dayjs from "dayjs";
import { useGetPegawaiPalingRajin } from "./controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { getBulanOptions, getTahunOptions } from "@/const/listTanggal";
import { getInitials } from "@/utils/helpers";
import {
	LeaderboardRowSkeleton,
	PodiumCard,
	PodiumSkeleton,
} from "./components";
import { useEffect } from "react";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Users } from "lucide-react";

export default function PegawaiPalingRajinPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterPegawaiPalingRajinSchema>>({
		resolver: zodResolver(FilterPegawaiPalingRajinSchema),
	});

	const tahun = searchParams.get("tahun") || dayjs().format("YYYY");
	const bulan = searchParams.get("bulan") || dayjs().format("MM");

	const { data = [], loading } = useGetPegawaiPalingRajin({ tahun, bulan });

	function hitungSkorPegawai(item: PegawaiPalingRajin) {
		if (!item.efektif) return 0;
		return Math.round((item.masuk / item.efektif) * 10000) / 100;
	}

	const finalData = data
		.map((i) => ({ ...i, skor: hitungSkorPegawai(i) }))
		.sort((a, b) => b.skor - a.skor);

	const [rank1, rank2, rank3] = finalData;

	useEffect(() => {
		if (tahun) {
			form.setValue("tahun", tahun);
		}
	}, [tahun]);

	useEffect(() => {
		if (bulan) {
			form.setValue("bulan", bulan);
		}
	}, [bulan]);

	return (
		<div className="flex flex-col w-full gap-6">
			<Breadcrumbs
				items={[
					{ label: "Home", to: "/admin/presensi" },
					{ label: "Pegawai Paling Rajin" },
				]}
			/>

			<h1 className="text-2xl font-semibold text-[#1E5916]">
				Pegawai Paling Rajin
			</h1>

			{/* FILTER */}
			<Form {...form}>
				<form className="flex gap-4 w-full">
					<SelectCommon
						form={form}
						name="tahun"
						options={getTahunOptions()}
						placeholder="Tahun"
						className="w-full md:w-1/4"
						fx={(v) => setSearchParams({ tahun: v, bulan })}
					/>
					<SelectCommon
						form={form}
						name="bulan"
						options={getBulanOptions()}
						placeholder="Bulan"
						className="w-full md:w-1/4"
						fx={(v) => setSearchParams({ tahun, bulan: v })}
					/>
				</form>
			</Form>

			<div className="flex flex-col gap-4 w-full justify-center items-center">
				{/* PODIUM */}
				{loading ? (
					<PodiumSkeleton />
				) : finalData.length === 0 ? (
					<Empty className="w-full md:w-[40%]">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<Users className="size-6" />
							</EmptyMedia>
							<EmptyTitle>Data tidak tersedia</EmptyTitle>
							<EmptyDescription>
								Tidak ada data pegawai untuk periode ini
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				) : (
					finalData.length > 0 && (
						<div className="md:grid grid-cols-1 md:w-[40%] hidden md:grid-cols-3 gap-6">
							{rank2 && (
								<PodiumCard
									rank={2}
									name={rank2.nama}
									nip={rank2.nip}
									score={rank2.skor}
									photo={rank2.photo}
									color="bg-sky-50 border-sky-200 text-sky-700"
									link={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${rank2?.pegawai_id}/rekap-per-orang?user-id=${rank2}&tahun=${tahun}&bulan=${bulan}`}
								/>
							)}

							{rank1 && (
								<PodiumCard
									rank={1}
									name={rank1.nama}
									nip={rank1.nip}
									score={rank1.skor}
									photo={rank1.photo}
									color="bg-orange-50 border-orange-200 text-orange-700"
									link={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${rank1?.pegawai_id}/rekap-per-orang?user-id=${rank2}&tahun=${tahun}&bulan=${bulan}`}
								/>
							)}

							{rank3 && (
								<PodiumCard
									rank={3}
									name={rank3.nama}
									nip={rank3.nip}
									score={rank3.skor}
									photo={rank3.photo}
									color="bg-emerald-50 border-emerald-200 text-emerald-700"
									link={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${rank3?.pegawai_id}/rekap-per-orang?user-id=${rank2}&tahun=${tahun}&bulan=${bulan}`}
								/>
							)}
						</div>
					)
				)}

				{/* LEADERBOARD LIST */}
				{loading ? (
					<LeaderboardRowSkeleton />
				) : (
					finalData.length > 3 && (
						<div className="mt-6 rounded-xl w-full md:w-[40%] border bg-white">
							{finalData.map((item, idx) => (
								<Link
									key={idx}
									to={`/admin/presensi/laporan-kehadiran/rekap-per-orang/${item?.pegawai_id}/rekap-per-orang?user-id=${rank2}&tahun=${tahun}&bulan=${bulan}`}
									className="flex items-center justify-between px-6 py-4 hover:bg-slate-50"
								>
									<div className="flex items-center gap-4">
										<span className="w-6 text-center font-medium text-slate-500">
											{idx + 1}
										</span>

										{item.photo ? (
											<img
												src={item.photo}
												className="h-10 w-10 rounded-full"
											/>
										) : (
											<div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm">
												{getInitials(item.nama)}
											</div>
										)}

										<div>
											<p className="font-medium">{item.nama}</p>
											<p className="text-sm text-slate-500">{item.nip}</p>
										</div>
									</div>

									<p className="font-semibold">{item.skor}</p>
								</Link>
							))}
						</div>
					)
				)}
			</div>
		</div>
	);
}
