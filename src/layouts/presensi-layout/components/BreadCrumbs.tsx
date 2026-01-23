import { ChevronRight } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbsProps = {
	items?: BreadcrumbItem[];
};

export function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className="flex w-full items-center text-sm text-gray-500"
		>
			<ol className="flex flex-wrap items-center gap-2">
				{items.map((item, idx) => {
					const isFirst = idx === 0;
					const isLast = idx === items.length - 1;

					return (
						<li key={idx} className="flex items-center gap-2">
							{isFirst ? (
								<Link
									to="/modules/presensi"
									className="flex items-center gap-1 hover:text-primary transition-colors"
								>
									<FaHome size={14} />
									{items.length === 1 && <span>Home</span>}
								</Link>
							) : item.to && !isLast ? (
								<Link
									to={item.to}
									className="hover:text-primary transition-colors"
								>
									{item.label}
								</Link>
							) : (
								<span className="font-medium text-primary line-clamp-1">
									{item.label}
								</span>
							)}

							{!isLast && <ChevronRight size={14} className="text-gray-400" />}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
