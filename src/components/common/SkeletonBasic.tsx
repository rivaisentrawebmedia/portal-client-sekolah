import { Skeleton } from "../ui/skeleton";

export function SkeletonLabel() {
	return (
		<div className="flex flex-col gap-1">
			<Skeleton className="h-4 w-32" />
			<Skeleton className="h-5 w-full" />
		</div>
	);
}

export function SkeletonBlock() {
	return (
		<div className="flex flex-col gap-1">
			<Skeleton className="h-4 w-40" />
			<Skeleton className="h-5 w-full" />
		</div>
	);
}
