import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/utils/helpers";
import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ButtonGantiPassword } from "@/layouts/main-layout/components/ButtonResetPassword";
import { DialogLogout } from "@/layouts/main-layout/components/dialogLogout";
import type { Profile } from "@/pages/aktor/admin/portal-admin/profile/model";

export function MenubarProfil({
	data,
	loading,
}: {
	data: Profile | undefined;
	loading: boolean;
}) {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	const navigate = useNavigate();
	return (
		<>
			<Menubar className="bg-[#0f2d0b] border border-none p-0">
				<MenubarMenu>
					<MenubarTrigger className="group bg-[#0f2d0b] p-0">
						<div className="flex items-center gap-2 bg-[#0f2d0b]">
							{loading ? (
								<>
									<Skeleton className="h-8 w-8 rounded-full" />
								</>
							) : (
								<>
									{data?.photo ? (
										<img
											src={data?.photo}
											alt={data?.nama}
											className="h-9 w-9 rounded-full"
										/>
									) : (
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
											{getInitials(data?.nama || "Joko Susilo")}
										</div>
									)}
								</>
							)}
						</div>
					</MenubarTrigger>

					{!loading && (
						<MenubarContent align="end" className="min-w-[220px]">
							<MenubarLabel>
								<div className="flex items-center gap-2">
									{data?.photo ? (
										<img
											src={data?.photo}
											alt={data?.nama}
											className="h-7 w-7 rounded-full"
										/>
									) : (
										<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5916] text-white">
											{getInitials(data?.nama || "Joko Susilo")}
										</div>
									)}

									<div className="flex flex-col">
										<p>{data?.nama}</p>
										<p className="font-light text-[#2769CD]">
											{data?.is_superadmin ? "Superadmin" : "Admin"}
										</p>
									</div>
								</div>
							</MenubarLabel>

							<MenubarSeparator />

							<MenubarItem asChild>
								<button
									onClick={() => {
										navigate("/admin/profile");
									}}
									className="flex w-full items-center gap-2"
								>
									<FaUser color="#2769CD" />
									Profile
								</button>
							</MenubarItem>

							<ButtonGantiPassword />

							<MenubarSeparator />

							<MenubarItem onClick={() => setIsLogoutOpen(true)}>
								<LogOut color="#CD2738" />
								Logout
							</MenubarItem>
						</MenubarContent>
					)}
				</MenubarMenu>
			</Menubar>

			<DialogLogout open={isLogoutOpen} onOpenChange={setIsLogoutOpen} />
		</>
	);
}
