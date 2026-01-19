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

const MENU_ROW =
	"flex h-10 w-full items-center  justify-between rounded-md px-3 text-sm font-normal text-white hover:bg-white/10";

export default function MainLayout() {
	const navigate = useNavigate();
	const { secondPathname, thirdPathname } = usePathname();

	const { title } = useHeaderTitle();

	return (
		<SidebarProvider defaultOpen>
			<div className="flex min-h-svh w-full">
				{/* SIDEBAR */}
				<Sidebar>
					<SidebarHeader className="px-4 py-3 flex flex-row justify-start items-center gap-2 w-full bg-[#01001A] text-white font-semibold">
						<div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#01001A]">
							<FaGraduationCap size={20} />
						</div>
						<Link to={"/modules"}>Manajamen Sekolah</Link>
					</SidebarHeader>

					<SidebarContent className="bg-[#01001A] text-white">
						<ScrollArea className="h-[calc(100svh-64px)] py-3">
							<SidebarMenu className="gap-1">
								{sidebarItems.map((item) => {
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
																`/modules/${convertToSlug(item?.label)}`
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
															}
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
															"flex items-center gap-2 duration-300 transition-colors"
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
																		}
																	)}
																	onClick={() => {
																		navigate(
																			`/modules/${convertToSlug(
																				item?.label
																			)}/${convertToSlug(child?.label)}`
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
						<MenubarProfil />
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
