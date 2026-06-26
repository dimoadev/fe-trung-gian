// SixBalls.jsx
import React from "react";

const colors = [
  "bg-rose-500",
  "bg-orange-400",
  "bg-amber-500",
  "bg-green-500",
  "bg-sky-500",
  "bg-indigo-500",
];

export default function SixBalls({ numbers }) {
  // đảm bảo mảng 6 phần tử
  const nums = Array.isArray(numbers) ? numbers.slice(0, 6) : [];
  while (nums.length < 6) nums.push("");

  return (
    <div className="flex gap-1 justify-center">
      {nums.map((n, idx) => (
        <div key={idx} className="relative w-[30px] h-[30px]">
          <div
            className={`sphere ${colors[idx % colors.length]} rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-semibold shadow-lg transform transition-all duration-200 ease-out hover:scale-105 focus:scale-105 focus:outline-none`}
            role="img"
            aria-label={`Quả bóng thứ ${idx + 1}: ${n}`}
            tabIndex={0}
            style={{
              background:
                "radial-gradient(100% 60% at 30% 25%, rgba(255,255,255,0.3), rgba(0,0,0,0.2))",
            }}
          >
            {n === null || n === undefined || n === "" ? "-" : n?.length < 2 ? `0${n}` : n}
          </div>
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-3/5 h-2 rounded-full filter blur-md opacity-40 bg-gradient-to-r from-black/30 via-black/15 to-black/15"
          />
        </div>
      ))}
    </div>
  );
}
