import { useNavigate } from "react-router-dom";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { FaExchangeAlt } from "react-icons/fa";
import { FanIcon } from "lucide-react";
import { usePathname } from "@/utils/usePathname";
import { useGetModul } from "@/pages/aktor/admin/portal-admin/dashboard/controller";

export function BlackHole() {
	const { data, loading } = useGetModul({
		search: "",
	});

	const { secondPathname } = usePathname();

	const navigate = useNavigate();

	return (
		<>
			<Menubar className="bg-[#123b0f] border border-none p-0">
				<MenubarMenu>
					<MenubarTrigger className="group bg-[#123b0f] p-0">
						<div className="flex items-center gap-2 bg-[#123b0f]">
							{loading ? (
								<>
									<Skeleton className="h-6 w-6 rounded-full" />
								</>
							) : (
								<>
									<div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-primary">
										<FaExchangeAlt />
									</div>
								</>
							)}
						</div>
					</MenubarTrigger>

					{!loading && (
						<MenubarContent align="end" className="min-w-[220px]">
							{data
								?.filter((list) => list?.dapat_diakses)
								?.map((item, idx) => {
									const isActive = item?.slug === `/${secondPathname}`;
									return (
										<MenubarItem asChild key={idx}>
											<button
												disabled={isActive}
												onClick={() => {
													navigate(`/admin${item?.slug}`);
												}}
												className="flex w-full disabled:bg-emerald-50 items-center gap-2"
											>
												{item?.photo ? (
													<img
														src={item?.photo}
														alt={item?.nama}
														className="w-4 h-4"
													/>
												) : (
													<FanIcon size={16} />
												)}

												{item?.nama}
											</button>
										</MenubarItem>
									);
								})}
						</MenubarContent>
					)}
				</MenubarMenu>
			</Menubar>
		</>
	);
}
