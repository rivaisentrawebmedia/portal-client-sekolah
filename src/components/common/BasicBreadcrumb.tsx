import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import React from "react";

export type BreadcrumbItemData = {
	label: string;
	href: string;
};

type BasicBreadcrumbProps = {
	items: BreadcrumbItemData[];
	showHomeIcon?: boolean;
	className?: string;
};

export function BasicBreadcrumb({
	items,
	showHomeIcon = false,
	className,
}: BasicBreadcrumbProps) {
	const hasOverflow = items.length > 3;

	const overflowItems = items.slice(0, items.length - 2);
	const visibleTrailItems = items.slice(-2);

	return (
		<Breadcrumb>
			<BreadcrumbList className={className}>
				{/* ===== HOME ===== */}
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/" className="flex items-center gap-1">
							{showHomeIcon ? <FaHome size={14} /> : "Home"}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				{/* ===== OVERFLOW DROPDOWN ===== */}
				{hasOverflow && (
					<>
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center">
									<BreadcrumbEllipsis className="size-4" />
									<span className="sr-only">Toggle breadcrumb menu</span>
								</DropdownMenuTrigger>

								<DropdownMenuContent align="start">
									{overflowItems.map((item) => (
										<DropdownMenuItem key={item.href} asChild>
											<Link to={item.href}>{item.label}</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</BreadcrumbItem>

						<BreadcrumbSeparator />
					</>
				)}

				{/* ===== VISIBLE TRAIL ===== */}
				{visibleTrailItems.map((item, index) => {
					const isCurrentPage = index === visibleTrailItems.length - 1;

					return (
						<React.Fragment key={item.href}>
							<BreadcrumbItem>
								{isCurrentPage ? (
									<BreadcrumbPage>{item.label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link to={item.href}>{item.label}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>

							{!isCurrentPage && <BreadcrumbSeparator />}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
