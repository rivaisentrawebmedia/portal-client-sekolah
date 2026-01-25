import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Menu } from "@/layouts/main-layout/model/dataType";
import { usePathname } from "@/utils/usePathname";
import { convertToSlug } from "@/utils/helpers";

export function NavigasiPresensiDesa({
	menu,
	loading,
}: {
	menu: Menu[];
	loading: boolean;
}) {
	const { thirdPathname, fourthPathname, fivethPathname } = usePathname();
	const navigate = useNavigate();

	const [activeL1, setActiveL1] = useState<string | null>(null);
	const [activeL2, setActiveL2] = useState<string | null>(null);

	const menuRef = useRef<HTMLDivElement>(null);

	const onClickL1 = (item: Menu) => {
		if (item.children?.length) {
			setActiveL1((prev) => (prev === item?.id ? null : item?.id));
			setActiveL2(null);
			return;
		}

		if (item?.slug) {
			navigate(`/admin/presensi${item?.slug}`);
			setActiveL1(null);
			setActiveL2(null);
		}
	};

	const onClickL2 = (child: Menu, parent: Menu) => {
		if (child.children?.length) {
			setActiveL2((prev) => (prev === child?.id ? null : child?.id));
			return;
		}

		if (child?.slug) {
			navigate(`/admin/presensi${parent?.slug}${child?.slug}`);
			setActiveL1(null);
			setActiveL2(null);
		}
	};

	const onClickL3 = (parent: Menu, child: Menu, lv3: Menu) => {
		if (lv3.slug) {
			navigate(`/admin/presensi${parent?.slug}${child?.slug}${lv3?.slug}`);
		}
		setActiveL1(null);
		setActiveL2(null);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setActiveL1(null);
				setActiveL2(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			ref={menuRef}
			className="relative md:flex md:items-center gap-6 border-b-2 bg-white px-4 md:px-24 text-sm hidden"
		>
			{loading ? (
				<NavigationSkeleton />
			) : (
				menu?.map((item) => {
					const isActive =
						thirdPathname === convertToSlug(item?.nama) ||
						(!thirdPathname && item?.nama === "Beranda");

					return (
						<div key={item?.id} className="relative">
							<div
								onClick={() => onClickL1(item)}
								className={clsx(
									"cursor-pointer border-b-2 py-3 transition-colors",
									{
										"border-primary text-primary":
											isActive || activeL1 === item?.id,
										"border-transparent hover:text-primary":
											!isActive && activeL1 !== item?.id,
									},
								)}
							>
								{item?.nama}
							</div>

							{/* LEVEL 2 */}
							{activeL1 === item?.id && (item?.children || [])?.length > 0 && (
								<div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-lg bg-white p-1 shadow-lg">
									{item?.children?.map((child) => {
										const isActiveLv2 =
											fourthPathname === convertToSlug(child?.nama);

										return (
											<div
												key={child.id}
												onClick={(e) => {
													e.stopPropagation();
													onClickL2(child, item);
												}}
												className={clsx(
													"relative cursor-pointer flex items-center justify-between rounded-md px-3 py-2 text-sm",
													{
														"bg-[#F1F7F2] text-primary": isActiveLv2,
														"hover:bg-gray-100": !isActiveLv2,
													},
												)}
											>
												<span>{child.nama}</span>

												{(child?.children || [])?.length > 0 &&
													(activeL2 === child.id ? (
														<ChevronLeft size={14} />
													) : (
														<ChevronRight size={14} />
													))}

												{/* LEVEL 3 */}
												{activeL2 === child.id &&
													(child?.children || [])?.length > 0 && (
														<div
															className="absolute left-full top-0 z-50 ml-2 w-52 rounded-lg bg-white p-1 shadow-lg"
															onClick={(e) => e.stopPropagation()}
														>
															{child?.children?.map((lv3) => {
																const isActiveLv3 =
																	fivethPathname === convertToSlug(lv3?.nama);

																return (
																	<div
																		key={lv3?.id}
																		onClick={() => onClickL3(item, child, lv3)}
																		className={clsx(
																			"rounded-md px-3 py-2 text-sm cursor-pointer",
																			{
																				"bg-[#F1F7F2] text-primary":
																					isActiveLv3,
																				"hover:bg-gray-100": !isActiveLv3,
																			},
																		)}
																	>
																		{lv3?.nama}
																	</div>
																);
															})}
														</div>
													)}
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})
			)}
		</div>
	);
}

function NavigationSkeleton() {
	return (
		<div className="flex items-center gap-6 py-3">
			{Array.from({ length: 4 }).map((_, idx) => (
				<div key={idx} className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
			))}
		</div>
	);
}
