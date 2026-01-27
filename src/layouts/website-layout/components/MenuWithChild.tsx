import { JokoSeparator } from "@/assets/icons/JokoSeparator";
import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { Menu } from "@/layouts/main-layout/model";
import { convertToSlug } from "@/utils/helpers";
import { AccordionItem } from "@radix-ui/react-accordion";
import clsx from "clsx";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export function MenuWithChild({
	idx,
	item,
	isChildActive,
	fourthPathname,
}: {
	idx: number;
	item: Menu;
	isChildActive: boolean;
	fourthPathname: string;
}) {
	const navigate = useNavigate();
	const [openValue, setOpenValue] = useState<string | undefined>(undefined);

	// auto-open saat child aktif
	useEffect(() => {
		if (isChildActive) {
			setOpenValue(item.nama);
		}
	}, [isChildActive, item.nama]);

	return (
		<Accordion
			type="single"
			collapsible
			value={openValue}
			onValueChange={setOpenValue}
			key={idx}
		>
			<AccordionItem value={item.nama} className="border-none">
				<AccordionTrigger className="flex h-10 w-full duration-300 transition-colors items-center px-3 text-sm rounded-md hover:no-underline">
					<div className="flex items-center gap-2">
						{item?.photo ? (
							<img src={item.photo} className="size-4 shrink-0" />
						) : (
							<FaBoxOpen size={16} />
						)}
						{item.nama}
					</div>
				</AccordionTrigger>

				<AccordionContent className="space-y-0">
					<ul>
						{item.children?.map((child) => {
							const isActiveChild =
								fourthPathname === convertToSlug(child.nama);

							return (
								<li
									key={child.nama}
									onClick={() =>
										navigate(
											`/admin/website/${convertToSlug(
												item.nama,
											)}/${convertToSlug(child.nama)}`,
										)
									}
									className={clsx(
										"relative flex items-center gap-2 pl-5 text-sm cursor-pointer transition-colors",
										{
											"bg-[#CD2738]": isActiveChild,
											"hover:bg-white/10": !isActiveChild,
										},
									)}
								>
									<div className="flex items-center py-1.5 border-l gap-2">
										<JokoSeparator />
										<p className="text-sm">{child.nama}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
