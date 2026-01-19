import { useEffect, useState } from "react";

export const TimeNow = ({ className }: { className?: string }) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (date: Date) => {
		const pad = (n: number) => n.toString().padStart(2, "0");

		return `${pad(date.getDate())}-${pad(
			date.getMonth() + 1,
		)}-${date.getFullYear()}, ${pad(date.getHours())}:${pad(
			date.getMinutes(),
		)}:${pad(date.getSeconds())}`;
	};

	return <p className={className}>{formatTime(time)}</p>;
};
