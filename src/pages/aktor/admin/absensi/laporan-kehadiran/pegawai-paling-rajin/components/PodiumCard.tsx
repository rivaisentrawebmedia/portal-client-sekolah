import { getInitials } from "@/utils/helpers";
import clsx from "clsx";
import { Link } from "react-router-dom";

export function PodiumCard({
	rank,
	name,
	nip,
	score,
	photo,
	color,
	link,
}: {
	rank: number;
	name?: string;
	nip?: string;
	score?: number;
	photo?: string;
	color: string;
	link: string;
}) {
	return (
		<Link
			to={link}
			className={clsx(
				"flex flex-col items-center duration-300 w-full rounded-2xl border p-6 transition hover:scale-[1.02]",
				color,
			)}
		>
			<div className="relative">
				{photo ? (
					<img
						src={photo}
						className="h-24 w-24 rounded-full border-4 bg-white object-cover"
					/>
				) : (
					<div className="flex h-24 w-24 items-center justify-center rounded-full border-4 bg-slate-100 text-2xl font-semibold">
						{name ? getInitials(name) : "?"}
					</div>
				)}

				<span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow">
					{rank}
				</span>
			</div>

			<p className="mt-4 text-lg font-semibold text-center">{name}</p>
			<p className="text-sm text-slate-500">{nip}</p>

			<p className="mt-3 text-2xl font-bold">{score}</p>
		</Link>
	);
}
