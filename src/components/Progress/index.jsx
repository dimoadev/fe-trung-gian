import React from 'react';

const STEP_IDS_BY_STATUS = {
	CANCELED: [1, 2, 3, 4, 7, 10],
  WAITING_TIME: [1, 2, 3, 4, 5, 8, 10],
	COMPLAIN: [1, 2, 3, 4, 5, 8, 9, 10],
};

const DEFAULT_STEP_IDS = [1, 2, 3, 4, 5, 6, 10];

const PAST_COLORS = {
	1: 'bg-lime-300 text-lime-800',
	2: 'bg-lime-400 text-lime-900',
	3: 'bg-lime-500 text-lime-900',
	4: 'bg-lime-600 text-lime-900',
	5: 'bg-lime-700 text-lime-900',
	6: 'bg-lime-800 text-lime-900',
	7: 'bg-lime-800 text-lime-900',
	8: 'bg-lime-800 text-lime-900',
	9: 'bg-lime-800 text-lime-900',
	10: 'bg-lime-800 text-lime-900',
};

const StepProgress = ({ steps, currentStep = 1, status }) => {
	const allowedIds = STEP_IDS_BY_STATUS[status] || DEFAULT_STEP_IDS;
	const visibleSteps = steps.filter((step) => allowedIds.includes(step.id));

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-6">
			<div className="flex items-center w-full overflow-hidden rounded-full bg-gray-100 text-xs font-bold tracking-wider">
				{visibleSteps.map((step, index) => {
					const isCurrent = step.id === currentStep;
					const isPast = step.id < currentStep;
					const isFirst = index === 0;
					const isLast = index === visibleSteps.length - 1;

					let bgColor = 'bg-gray-100 text-gray-400';
					if (isPast) {
						bgColor = PAST_COLORS[step.id] || 'bg-gray-100 text-gray-400';
					} else if (isCurrent) {
						bgColor = 'bg-emerald-600 text-white';
					}

					return (
						<div
							key={step.id}
							className={`relative flex-1 flex items-center justify-center h-12 select-none ${bgColor}`}
							style={{
								clipPath: isFirst
									? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
									: isLast
									? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)'
									: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)',
								marginLeft: isFirst ? '0' : '-11px',
								zIndex: visibleSteps.length - index,
							}}
						>
							<span className="px-4 text-center truncate">{step.label}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StepProgress;
