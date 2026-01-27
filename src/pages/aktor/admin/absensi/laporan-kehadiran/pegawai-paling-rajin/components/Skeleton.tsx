export function PodiumSkeleton() {
	return (
		<div className="flex flex-col w-full md:w-1/3 items-center rounded-2xl border p-6 animate-pulse">
			<div className="h-24 w-24 rounded-full bg-slate-200" />
			<div className="mt-4 h-4 w-32 rounded bg-slate-200" />
			<div className="mt-2 h-3 w-24 rounded bg-slate-200" />
			<div className="mt-4 h-6 w-16 rounded bg-slate-200" />
		</div>
	);
}

export function LeaderboardRowSkeleton() {
	return (
		<div className="flex w-full md:w-1/3 items-center justify-between px-6 py-4 animate-pulse">
			<div className="flex items-center gap-4">
				<div className="h-4 w-6 rounded bg-slate-200" />
				<div className="h-10 w-10 rounded-full bg-slate-200" />
				<div>
					<div className="h-4 w-32 rounded bg-slate-200" />
					<div className="mt-2 h-3 w-24 rounded bg-slate-200" />
				</div>
			</div>
			<div className="h-4 w-10 rounded bg-slate-200" />
		</div>
	);
}
