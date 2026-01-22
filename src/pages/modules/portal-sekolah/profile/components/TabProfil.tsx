import clsx from "clsx";
import type { Profile } from "../model";

export function TabProfil({
	menu,
	setMenu,
	listMenu,
	dataProfil,
}: {
	setMenu: React.Dispatch<React.SetStateAction<string>>;
	menu: string;
	listMenu: string[];
	dataProfil: Profile | undefined;
}) {
	return (
		<>
			<div className="flex gap-0 border">
				{listMenu?.map((item, idx) => {
					const isActive = item === menu;
					return (
						<button
							key={idx}
							disabled={
								(dataProfil?.is_superadmin && item === listMenu?.[1]) ||
								(dataProfil?.is_superadmin && item === listMenu?.[2])
							}
							onClick={() => {
								setMenu(item);
							}}
							className={clsx(
								"w-full text-center disabled:bg-[#1E5916]/10 cursor-pointer duration-300 transition-colors border-[#1E5916] py-1.5",
								{
									"bg-[#1E5916] text-white": isActive,
									"text-[#1E5916]": !isActive,
								},
							)}
						>
							{item}
						</button>
					);
				})}
			</div>
		</>
	);
}
