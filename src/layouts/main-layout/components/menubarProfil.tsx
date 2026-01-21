import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { DialogLogout } from "./dialogLogout";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/utils/helpers";
import { FaCaretDown, FaKeyboard, FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Profile } from "@/pages/modules/portal-sekolah/profile/model";

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
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger className="group">
						<div className="flex items-center gap-2">
							{loading ? (
								<>
									<Skeleton className="h-7 w-7 rounded-full" />
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-6 w-6 rounded-full" />
								</>
							) : (
								<>
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5916] text-white">
										{getInitials(data?.nama || "Joko Susilo")}
									</div>

									<p>{data?.nama}</p>

									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F5FF]">
										<FaCaretDown
											size={16}
											className="transition-transform duration-200 group-data-[state=open]:rotate-180"
										/>
									</div>
								</>
							)}
						</div>
					</MenubarTrigger>

					{!loading && (
						<MenubarContent align="end" className="min-w-[220px]">
							<MenubarLabel>
								<div className="flex items-center gap-2">
									<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5916] text-white">
										{getInitials(data?.nama || "Joko Susilo")}
									</div>

									<div className="flex flex-col">
										<p>{data?.nama}</p>
										<p className="font-light text-[#2769CD]">
											{data?.username}
										</p>
									</div>
								</div>
							</MenubarLabel>

							<MenubarSeparator />

							<MenubarItem asChild>
								<button
									onClick={() => {
										navigate("/profil");
									}}
									disabled
									className="flex w-full items-center gap-2"
								>
									<FaUser color="#2769CD" />
									Profile
								</button>
							</MenubarItem>

							<MenubarItem asChild>
								<button
									onClick={() => {
										navigate("/reset-password");
									}}
									disabled
									className="flex w-full items-center gap-2"
								>
									<FaKeyboard color="#CDA327" />
									Reset Password
								</button>
							</MenubarItem>

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
