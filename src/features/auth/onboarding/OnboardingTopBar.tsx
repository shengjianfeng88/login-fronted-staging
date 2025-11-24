import React from "react";
import imglogo from "@/assets/onboarding/fAIshion-logo.png"

interface OnboardingHeaderProps {
  /** show the top brand navbar */
  showNavbar?: boolean;
  /** progress from 0 to 1 */
  progress?: number;

  /** show back/next row under progress bar */
  showControls?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;

  /** optional right-side action (rare) */
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
      {/* Navbar row (height ~60px) */}
      {showNavbar && (
        <header
          className="
            w-full
            h-[60px]
            flex items-center justify-between
            px-[30px]
            py-[14px]
            bg-white
          "
        >
          <div className="flex items-center">
  <img
    src={imglogo}
    alt="fAIshion.ai"
    className="
      h-[28px] md:h-[32px]
      w-auto
      object-contain
      select-none
    "
    draggable={false}
  />
</div>
          {rightSlot ? rightSlot : <div className="w-6" />}
        </header>
      )}

      {/* Progress bar row (BAR height is 20px) */}
      <div className="w-full bg-white">
        <div className="w-full h-[20px]">
          <div
            className="h-[20px] bg-[#6A5ACD]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Controls row UNDER progress bar */}
      {showControls && (
        <div className="w-full bg-white">
          <div className="flex items-center justify-between px-[30px] py-2">
            {/* Back button = same CSS as other pages */}
            <button
              type="button"
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Back"
            >
              <span
                aria-hidden
                className="inline-block h-5 w-5 border-l-[3.5px] border-b-[3.5px] border-[#767676] rotate-45 translate-x-[1px]"
              />
            </button>

            {/* Next pill */}
            {onNext && (
  nextLabel.toLowerCase() === "skip" ? (
  
    <button
      type="button"
      onClick={onNext}
      className="
        text-[#767676]
        text-[18px] md:text-[20px]
        font-medium
      "
    >
      Skip
    </button>
  ) : (
    <button
      type="button"
      onClick={onNext}
      className="
        inline-flex items-center gap-2
        h-8
        rounded-[10px] bg-[#2C2C2C]
        px-3
        text-[12px] md:text-[13px]
        font-semibold text-white
        shadow-sm hover:bg-black/80
        transition-colors
      "
    >
      {nextLabel}
      <span
        aria-hidden
        className="inline-block h-2 w-2 border-r-[2px] border-b-[2px] border-white rotate-[-45deg] translate-y-[1px]"
      />
    </button>
  )
)}
          </div>
        </div>
      )}
    </div>
  );
};
