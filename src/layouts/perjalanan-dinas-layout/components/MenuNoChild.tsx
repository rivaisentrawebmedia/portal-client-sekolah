import { SidebarMenuItem } from "@/components/ui/sidebar";
import type { Menu } from "@/layouts/main-layout/model";
import clsx from "clsx";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function MenuNoChild({
	idx,
	item,
	isActive,
}: {
	idx: number;
	item: Menu;
	isActive: boolean;
}) {
	const navigate = useNavigate();
	return (
		<>
			<SidebarMenuItem key={idx}>
				<button
					onClick={() => {
						if (item?.nama === "Dashboard") {
							navigate("/admin/perjalanan-dinas");
						} else {
							navigate(`/admin/perjalanan-dinas${item?.slug}`);
						}
					}}
					className={clsx(
						"flex w-full duration-300 transition-colors items-center py-2 px-3 text-sm",
						{
							"bg-white/20": isActive,
							"hover:bg-white/10": !isActive,
						},
					)}
				>
					<div className="flex items-center gap-2">
						{item?.photo ? (
							<img src={item?.photo} alt="Icon" className="size-4 shrink-0" />
						) : (
							<FaBoxOpen size={16} />
						)}
						{item?.nama}
					</div>
				</button>
			</SidebarMenuItem>
		</>
	);
}
