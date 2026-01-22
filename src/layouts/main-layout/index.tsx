import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar-provider";
import { sidebarItems } from "@/const/sidebarItems";
import { convertSlugToText, convertToSlug } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { FaGraduationCap } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useHeaderTitle } from "./hooks/headerContext";
import { MenubarProfil, TimeNow } from "./components";
import "dayjs/locale/id";
import { useGetProfile } from "@/pages/modules/portal-sekolah/profile/controller";
import { Pencil } from "lucide-react";

const MENU_ROW =
	"flex h-10 w-full items-center  justify-between rounded-md px-3 text-sm font-normal text-white hover:bg-white/10";

export default function MainLayout() {
	const navigate = useNavigate();
	const { secondPathname, thirdPathname } = usePathname();

	const { title } = useHeaderTitle();

	const { loading, data } = useGetProfile();

	return (
		<SidebarProvider defaultOpen>
			<div className="flex min-h-svh w-full">
				{/* SIDEBAR */}
				<Sidebar>
					<SidebarHeader className="px-4 py-3 bg-[#021A00] text-white">
						<Link
							to={"/modules"}
							className="flex flex-row justify-start items-center gap-2 w-full"
						>
							{data?.photo_sekolah ? (
								<img src={data?.photo_sekolah} className="h-8 w-8" />
							) : (
								<div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#01001A]">
									<FaGraduationCap size={20} />
								</div>
							)}
							<div className="flex flex-col gap-0">
								<p className="text-md font-medium">{data?.nama_sekolah}</p>
								<p className="text-xs">{data?.email}</p>
							</div>
						</Link>
					</SidebarHeader>

					<hr className="border-t w-full border-[#1E5916]" />

					<div className="flex flex-col gap-4 py-4 bg-[#021A00] items-center justify-center">
						{data?.photo_sekolah && (
							<img
								src={data?.photo_sekolah}
								alt={data?.nama_sekolah}
								className="w-1/3"
							/>
						)}

						<div className="flex flex-col gap-0 text-white items-center justify-center">
							<p className="">{data?.nama}</p>
							<p className="text-xs">
								{data?.is_superadmin ? "Superadmin" : "Admin"}
							</p>
						</div>
						<button
							type="button"
							onClick={() => {
								navigate("/modules/profile");
							}}
							className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white text-white text-xs"
						>
							<Pencil size={14} />
							Edit Profil
						</button>
					</div>

					<SidebarContent className="bg-[#021A00] text-white">
						<ScrollArea className="h-[calc(100svh-64px)] py-3">
							<SidebarMenu className="gap-1">
								{(data?.is_superadmin
									? sidebarItems
									: sidebarItems?.slice(0, 1)
								)?.map((item) => {
									if (!item.children) {
										const isActive =
											convertToSlug(item?.label) === secondPathname ||
											(!secondPathname && item?.label === "Dashboard");
										return (
											<SidebarMenuItem key={item.label}>
												<button
													onClick={() => {
														if (item?.label === "Dashboard") {
															navigate("/modules");
														} else {
															navigate(
																`/modules/${convertToSlug(item?.label)}`,
															);
														}
													}}
													className={MENU_ROW}
												>
													<div
														className={clsx(
															"flex items-center gap-2 duration-300 transition-colors",
															{
																"text-[#70F2B6]": isActive,
															},
														)}
													>
														{item.icon && (
															<item.icon className="size-4 shrink-0" />
														)}
														<span>{item.label}</span>
													</div>
												</button>
											</SidebarMenuItem>
										);
									}

									return (
										<Accordion
											key={item.label}
											type="single"
											collapsible
											className="w-full"
										>
											<AccordionItem value={item.label} className="border-none">
												<AccordionTrigger
													className={`
																${MENU_ROW}
																[&>svg]:size-4
																[&>svg]:text-white/60
																hover:no-underline
																`}
												>
													<div
														className={clsx(
															"flex items-center gap-2 duration-300 transition-colors",
														)}
													>
														{item.icon && (
															<item.icon className="size-4 shrink-0" />
														)}
														<span>{item.label}</span>
													</div>
												</AccordionTrigger>

												<AccordionContent className="pl-4">
													<ul className="relative space-y-1 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-white/20">
														{item.children.map((child) => {
															const isActive =
																thirdPathname === convertToSlug(child?.label);
															return (
																<li
																	key={child.label}
																	className={clsx(
																		"relative flex duration-300 transition-colors items-center gap-2 pl-6 text-sm  cursor-pointer",
																		{
																			"text-[#70F2B6]": isActive,
																			"hover:text-emerald-400 text-white/80 ":
																				!isActive,
																		},
																	)}
																	onClick={() => {
																		navigate(
																			`/modules/${convertToSlug(
																				item?.label,
																			)}/${convertToSlug(child?.label)}`,
																		);
																	}}
																>
																	<span className="absolute left-0 top-1/2 h-px w-3 bg-white/20" />
																	{child.label}
																</li>
															);
														})}
													</ul>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									);
								})}
							</SidebarMenu>
						</ScrollArea>
					</SidebarContent>
				</Sidebar>

				{/* MAIN AREA */}
				<SidebarInset className="flex flex-col w-full  bg-white">
					{/* MOBILE HEADER */}
					<header className="flex h-14 items-center gap-2 bg-[#01001A] text-white border-b px-4 md:hidden">
						<SidebarTrigger />
						<h1 className="font-semibold">Manajemen Sekolah</h1>
					</header>

					{/* DESKTOP HEADER (OPTIONAL) */}
					<header className="hidden md:flex items-center gap-4 justify-between border-b border-[#DFDFDF] px-4 py-2">
						<div className="flex flex-col gap-0">
							<p className="font-semibold">
								{title || convertSlugToText(secondPathname || "Dashboard")}
							</p>
							<TimeNow className="text-[#888]" />
						</div>
						<MenubarProfil data={data} loading={loading} />
					</header>

					{/* CONTENT */}
					<main className="flex-1 p-4">
						<Outlet />
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
