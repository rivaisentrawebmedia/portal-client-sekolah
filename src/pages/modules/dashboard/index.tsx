export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-4">
			{/* <div className="flex flex-row items-center justify-between gap-4">
				{loading ? (
					<div className="h-7 w-64 animate-pulse rounded-md bg-slate-200" />
				) : (
					<p className="text-2xl font-medium">
						Selamat Datang
						{profile?.nama && (
							<span className="font-medium text-[#162259]">
								{`, ${profile.nama}`}
							</span>
						)}
					</p>
				)}
			</div> */}
			{/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
				<CardClient data={data} loading={loadingDashboard} />
				{(data?.provinsi || [])?.length > 0 && (
					<ChartProvinsiSekolah data={data} loading={loadingDashboard} />
				)}
				{(data?.pendidikan || [])?.length > 0 && (
					<ChartPendidikanSekolah data={data} loading={loadingDashboard} />
				)}
				<CardJumlahAset data={data} loading={loadingDashboard} />
			</div> */}
		</div>
	);
}
