// navigasi/MobileNavigasiPresensiDesa.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, ChevronDown, ChevronRight, X } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "@/utils/usePathname";
import type { Menu } from "@/layouts/main-layout/model/dataType";
import { convertToSlug } from "@/utils/helpers";

export function MobileNavigasiPresensiDesa({ menu }: { menu?: Menu[] }) {
	const navigate = useNavigate();
	const { thirdPathname, fourthPathname, fivethPathname } = usePathname();

	const [isOpen, setIsOpen] = useState(false);
	const [activeL1, setActiveL1] = useState<string | null>(null);
	const [activeL2, setActiveL2] = useState<string | null>(null);

	const panelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!menu) return;

		const foundL1 = menu.find(
			(m) => convertToSlug(m?.nama ?? "") === thirdPathname,
		);

		if (foundL1) {
			setActiveL1(foundL1.id ?? null);

			const foundL2 = foundL1.children?.find(
				(c) => convertToSlug(c?.nama ?? "") === fourthPathname,
			);

			if (foundL2) setActiveL2(foundL2.id ?? null);
		}
	}, [menu, thirdPathname, fourthPathname]);

	useEffect(() => {
		const handleOutside = (e: MouseEvent) => {
			if (
				isOpen &&
				panelRef.current &&
				!panelRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
				setActiveL1(null);
				setActiveL2(null);
			}
		};
		document.addEventListener("mousedown", handleOutside);
		return () => document.removeEventListener("mousedown", handleOutside);
	}, [isOpen]);

	const closeAll = () => {
		setIsOpen(false);
		setActiveL1(null);
		setActiveL2(null);
	};

	const onClickL1 = (item: Menu) => {
		if (item?.children?.length) {
			setActiveL1((p) => (p === item.id ? null : item.id));
			setActiveL2(null);
			return;
		}
		if (item?.slug) {
			navigate(`/admin/presensi${item.slug}`);
			closeAll();
		}
	};

	const onClickL2 = (child: Menu, parent: Menu) => {
		if (child?.children?.length) {
			setActiveL2((p) => (p === child.id ? null : child.id));
			return;
		}
		if (child?.slug) {
			navigate(`/admin/presensi${parent.slug}${child.slug}`);
			closeAll();
		}
	};

	const onClickL3 = (parent: Menu, child: Menu, lv3: Menu) => {
		if (lv3?.slug) {
			navigate(`/admin/presensi${parent.slug}${child.slug}${lv3.slug}`);
			closeAll();
		}
	};

	return (
		<div className="block md:hidden">
			{/* TOP BAR */}
			<div
				style={{
					background: "linear-gradient(90deg, #1e5916 0%, #0f2d0b 100%)",
				}}
				className="flex items-center justify-between text-white px-4 py-3"
			>
				<span className="text-base font-medium">Menu</span>
				<button
					onClick={() => setIsOpen((s) => !s)}
					className="rounded-md p-2 hover:bg-gray-100"
				>
					{isOpen ? <X size={18} /> : <AlignJustify size={18} />}
				</button>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex">
					<div className="absolute inset-0 bg-black/40" />

					{/* PANEL */}
					<div
						ref={panelRef}
						className="relative z-50 h-full w-72 bg-white px-4 py-3 shadow-lg"
					>
						<div className="mb-3 flex items-center justify-between">
							<span className="text-base font-semibold">Navigasi</span>
							<button
								onClick={closeAll}
								className="rounded p-1 hover:bg-gray-100"
							>
								<X size={16} />
							</button>
						</div>

						<nav className="space-y-1 overflow-y-auto">
							{menu?.map((item) => {
								const isActiveL1 =
									convertToSlug(item?.nama ?? "") === thirdPathname ||
									activeL1 === item?.id;

								return (
									<div key={item?.id}>
										{/* L1 */}
										<div
											onClick={() => item && onClickL1(item)}
											className={clsx(
												"flex items-center justify-between rounded-md px-3 py-2 text-sm",
												{
													"bg-[#F1F7F2] text-primary": isActiveL1,
													"hover:bg-gray-100": !isActiveL1,
												},
											)}
										>
											<span>{item?.nama}</span>
											{item?.children?.length ? (
												isActiveL1 ? (
													<ChevronDown size={14} />
												) : (
													<ChevronRight size={14} />
												)
											) : null}
										</div>

										{/* L2 */}
										{isActiveL1 && item?.children?.length ? (
											<div className="ml-3 mt-1 border-l border-gray-100 pl-3 space-y-1">
												{item.children.map((child) => {
													const isActiveL2 =
														convertToSlug(child?.nama ?? "") ===
															fourthPathname || activeL2 === child?.id;

													return (
														<div key={child?.id}>
															<div
																onClick={() => child && onClickL2(child, item)}
																className={clsx(
																	"flex items-center justify-between rounded-md px-3 py-2 text-sm",
																	{
																		"bg-[#F1F7F2] text-primary": isActiveL2,
																		"hover:bg-gray-100": !isActiveL2,
																	},
																)}
															>
																<span>{child?.nama}</span>
																{child?.children?.length ? (
																	isActiveL2 ? (
																		<ChevronDown size={14} />
																	) : (
																		<ChevronRight size={14} />
																	)
																) : null}
															</div>

															{/* L3 */}
															{isActiveL2 && child?.children?.length ? (
																<div className="ml-3 mt-1 border-l border-gray-100 pl-3 space-y-1">
																	{child.children.map((lv3) => {
																		const isActiveL3 =
																			convertToSlug(lv3?.nama ?? "") ===
																			fivethPathname;

																		return (
																			<div
																				key={lv3?.id}
																				onClick={() =>
																					lv3 && onClickL3(item, child, lv3)
																				}
																				className={clsx(
																					"rounded-md px-3 py-2 text-sm cursor-pointer",
																					{
																						"bg-[#F1F7F2] text-primary":
																							isActiveL3,
																						"hover:bg-gray-100": !isActiveL3,
																					},
																				)}
																			>
																				{lv3?.nama}
																			</div>
																		);
																	})}
																</div>
															) : null}
														</div>
													);
												})}
											</div>
										) : null}
									</div>
								);
							})}
						</nav>
					</div>
				</div>
			)}
		</div>
	);
}
