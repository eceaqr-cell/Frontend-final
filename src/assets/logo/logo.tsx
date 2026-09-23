import type { SVGAttributes } from "react";

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <svg
        width="48"
        height="48"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <defs>
          <linearGradient id="nexusGradient" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c7ccd3" />
            <stop offset="45%" stopColor="#2b333d" />
            <stop offset="100%" stopColor="#6b7684" />
          </linearGradient>
        </defs>

        {/* outer ring */}
        <circle
          cx="45"
          cy="45"
          r="41"
          stroke="url(#nexusGradient)"
          strokeWidth="4"
          className="fill-white dark:fill-[#030712]"
        />

        {/* interlocking N */}
        <path
          d="M27 62V28C27 26.3431 28.3431 25 30 25C30.8557 25 31.6698 25.3661 32.2384 26.0043L58 55V28C58 26.3431 59.3431 25 61 25C62.6569 25 64 26.3431 64 28V62C64 63.6569 62.6569 65 61 65C60.1443 65 59.3302 64.6339 58.7616 63.9957L33 35V62C33 63.6569 31.6569 65 30 65C28.3431 65 27 63.6569 27 62Z"
          fill="url(#nexusGradient)"
        />
      </svg>

      <div className="flex flex-col items-start justify-center leading-none">
        <span className="text-lg font-extrabold tracking-wide text-[#030712] dark:text-white">
          NEXUS
        </span>
        <span className="text-[9px] font-semibold tracking-[0.35em] text-[#4b5563] dark:text-[#9ca3af]">
          E-COM
        </span>
      </div>
    </div>
  );
};

export default Logo;