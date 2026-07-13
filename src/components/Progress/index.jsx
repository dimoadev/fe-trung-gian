import React from 'react';

const StepProgress = ({ steps , currentStep = 1 }) => {

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center w-full overflow-hidden rounded-full bg-gray-100 text-xs font-bold tracking-wider">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isPast = step.id < currentStep;
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          // Định nghĩa màu sắc theo từng trạng thái giống ảnh mẫu
          let bgColor = 'bg-gray-100 text-gray-400'; // Chưa đến (FINAL)
          if (isPast) {
            if (step.id === 1) bgColor = 'bg-lime-400 text-lime-800';
            if (step.id === 2) bgColor = 'bg-lime-500 text-lime-900';
          } else if (isCurrent) {
            bgColor = 'bg-emerald-600 text-white'; // Bước hiện tại (UPLOAD PHOTO)
          }

          return (
            <div
              key={step.id}
              className={`relative flex-1 flex items-center justify-center h-12 select-none ${bgColor}`}
              style={{
                // Tạo hiệu ứng mũi tên cắt góc bằng clip-path
                clipPath: isFirst 
                  ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
                  : isLast
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)'
                  : 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)',
                // Bù trừ khoảng trống để các mũi tên xếp chồng khít lên nhau
                marginLeft: isFirst ? '0' : '-11px',
                zIndex: steps.length - index,
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
