// src/components/onboarding/OnboardingHeader.tsx
import React from "react";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  nextLabel?: string;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  onNext,
  nextLabel = "Next",
}) => {
  const progress = Math.min(
    100,
    Math.max(0, (currentStep / totalSteps) * 100)
  );

  return (
    <header className="w-full bg-white">
      {/* top bar */}
      <div className="mx-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between px-4 md:px-8 lg:px-10">
        {/* brand */}
        <div className="text-[18px] md:text-[20px] font-semibold tracking-[0.02em] text-[#000000]">
          fAIshion.AI
        </div>

        {/* right side button (Next / Skip etc.) */}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full bg-[#1F1F1F] px-4 py-1.5 text-[13px] md:text-[14px] font-semibold text-white shadow-sm hover:bg-black transition-colors"
          >
            {nextLabel}
            <span
              aria-hidden
              className="inline-block h-2 w-2 border-b-[2px] border-r-[2px] border-white rotate-[-45deg] translate-y-[1px]"
            />
          </button>
        )}
      </div>

      {/* progress bar container */}
      <div className="w-full border-t border-[#EEEEEE]">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 lg:px-10 py-2">
          <div className="h-[20px] w-full rounded-full bg-[#E9DDFF] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#6A5ACD] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
