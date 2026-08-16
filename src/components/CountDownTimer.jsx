import React, { useState, useEffect } from 'react';

function getTimeLeft(targetDate) {
	const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((diff % (1000 * 60)) / 1000),
		diff,
	};
}

const CountDownTimer = ({ targetDate, onComplete, className = '' }) => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

	useEffect(() => {
		setTimeLeft(getTimeLeft(targetDate));
		const interval = setInterval(() => {
			const next = getTimeLeft(targetDate);
			setTimeLeft(next);
			if (next.diff === 0) {
				clearInterval(interval);
				onComplete?.();
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [targetDate]);

	const pad = (n) => String(n).padStart(2, '0');

	return (
		<span className={className}>
			{timeLeft.days > 0 && `${timeLeft.days} ngày `}
			{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
		</span>
	);
};

export default CountDownTimer;
