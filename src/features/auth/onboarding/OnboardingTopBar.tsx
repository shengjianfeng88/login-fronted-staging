import React from "react";
import imglogo from "@/assets/onboarding/fAIshion-logo.png";

interface OnboardingHeaderProps {
  showNavbar?: boolean;
  progress?: number;
  showControls?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  rightSlot?: React.ReactNode;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  showNavbar = true,
  progress = 0,
  showControls = false,
  onBack,
  onNext,
  nextLabel = "Next",
  rightSlot,
}) => {
  const pct = Math.min(1, Math.max(0, progress)) * 100;

  return (
    <div className="w-full sticky top-0 z-50">
      {showNavbar && (
        <header
  className="
    w-full
      flex items-center justify-between
      bg-white
      border-b-[2px] border-[#E5E5E5]
      h-[44px] md:h-[48px] lg:h-[52px]
      pl-[16px] pr-[16px]
      md:pl-[24px] md:pr-[20px]
      lg:pl-[32px] lg:pr-[28px]
  "
>
  <div className="flex items-center">
    <img
      src={imglogo}
      alt="fAIshion.ai"
      className=" h-[18px] md:h-[20px] lg:h-[24px]
          w-auto
          object-contain
          select-none"
      draggable={false}
    />
  </div>
  {rightSlot ? rightSlot : <div className="w-6" />}
</header>
      )}

      <div className="w-full bg-white">
        <div className="w-full h-[10px]">
          <div
            className="h-[10px] bg-[#6A5ACD]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {showControls && (
  <div className="w-full bg-white">
    <div className="flex items-center justify-between px-[30px] py-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
        aria-label="Back"
      >
        <span
          aria-hidden
          className="inline-block h-3 w-3 border-l-[3.5px] border-b-[3.5px] border-[#767676] rotate-45 translate-x-[1px]"
        />
      </button>

      {onNext && (
  (() => {
    const isSkip = nextLabel?.toLowerCase() === "skip";

    return (
      <button
        type="button"
        onClick={onNext}
        className={`
          inline-flex items-center justify-center
          h-8
          px-3
          rounded-[8px]
          text-[12px] md:text-[13px]
          font-semibold
          min-w-[72px]
          transition-all duration-200
          ${
            isSkip
              ? "bg-transparent text-[#767676] shadow-none hover:bg-gray-50"
              : "bg-[#2C2C2C] text-white shadow-sm hover:bg-black/80"
          }
        `}
      >
        <span className="mr-1">
          {isSkip ? "Skip" : nextLabel || "Next"}
        </span>

        {!isSkip && (
          <span
            aria-hidden
            className="
              inline-block h-2 w-2
              border-r-[2px] border-b-[2px] border-white
              rotate-[-45deg] translate-y-[1px]
            "
          />
        )}
      </button>
    );
  })()
)}

    </div>
  </div>
)}

    </div>
  );
};
