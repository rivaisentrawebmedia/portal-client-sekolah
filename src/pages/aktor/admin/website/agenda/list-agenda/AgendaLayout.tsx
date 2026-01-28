import { Button } from "@/components/ui/button";
import { convertToSlug } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AgendaLayout() {
	const navigate = useNavigate();
	const { fourthPathname } = usePathname();

	const listDashboard = ["Published", "Draft"];

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<p className="text-2xl font-medium">Agenda</p>
					<Button
						type="button"
						onClick={() => {
							navigate("tulis-agenda");
						}}
						variant={"outline"}
						className="border-[#276CCD] text-[#276CCD]"
					>
						<Plus />
						Tulis Agenda
					</Button>
				</div>

				<div className="flex gap-0 rounded-l-full rounded-r-full border border-[#276CCD]">
					{listDashboard?.map((item, idx) => {
						const isActive =
							(!fourthPathname && item === listDashboard?.[0]) ||
							fourthPathname === convertToSlug(item);
						return (
							<div
								onClick={() => {
									if (item === listDashboard?.[0]) {
										navigate(`/admin/website/agenda`);
									} else {
										navigate(`/admin/website/agenda/${convertToSlug(item)}`);
									}
								}}
								key={idx}
								className={clsx(
									"w-full text-center py-1.5 cursor-pointer duration-300 transition-colors",
									{
										"bg-[#276CCD] text-white": isActive,
										"text-[#276CCD]": !isActive,
									},
									{
										"rounded-l-full": idx === 0,
										"rounded-r-full": idx === 2,
									},
								)}
							>
								{item}
							</div>
						);
					})}
				</div>

				<Outlet />
			</div>
		</>
	);
}
