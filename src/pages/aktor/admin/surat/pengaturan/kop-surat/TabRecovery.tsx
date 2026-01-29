import clsx from "clsx";
import type { IconType } from "react-icons/lib";

export function TabRecovery({
	setSelected,
	menu,
	selected,
	title = "Data",
}: {
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	selected: string;
	menu: {
		label: string;
		icon: IconType;
	}[];
	title?: string;
}) {
	return (
		<>
			<div className="flex flex-col h-fit gap-0 border border-[#e2e8f0] rounded-md w-full md:w-1/5">
				<p className="p-4">{title}</p>
				<hr className="border-t w-full" />
				<div className="flex flex-col gap-1 p-1">
					{menu?.map((item, idx) => {
						const isAstive = item?.label === selected;
						const Icon = item.icon;

						return (
							<div
								onClick={() => {
									setSelected(item?.label);
								}}
								className={clsx(
									"flex items-center gap-1.5 cursor-pointer duration-300 transition-colors px-3 py-1.5",
									{
										"bg-[#eef6ff] text-[#2a76de]": isAstive,
										"hover:text-[#2a76de]": !isAstive,
									}
								)}
								key={idx}
							>
								<Icon size={14} />
								{item?.label}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
