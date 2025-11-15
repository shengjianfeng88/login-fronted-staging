// src/features/auth/onboarding/steps/PinToolbarStep.tsx
import React from "react";
import pinToolbarVideo from "@/assets/onboarding/chrome.jitter.mp4";

interface PinToolbarStepProps {
  onNext: () => void;
}

export const PinToolbarStep: React.FC<PinToolbarStepProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
      {/* LEFT: text block (~390 x 208 in Figma) */}
      <div className="w-full md:w-[390px] min-h-[208px]">
         <h2 className="text-[26px] md:text-[32px] leading-[32px] md:leading-[39px] font-bold text-[#1E1E1E]">
          Pin fAIshion.AI to your toolbar📌
        </h2>

        {/* 18px / 26px, medium */}
        <p className="mt-3 text-[18px] leading-[26px] font-medium text-[#6B6B6B]">
          Keep it one click away while you shop
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex rounded-[10px] bg-[#2F2F2F] px-6 py-2 text-sm font-semibold text-white"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT: just the video, no extra border/frame */}
      <div className="flex w-full md:flex-1 items-center justify-center">
  <div className="w-full max-w-[706px] h-[260px] sm:h-[340px] md:h-[420px] lg:h-[507px] flex items-center justify-center">
    <video
      src={pinToolbarVideo}
      className="w-full h-full object-contain rounded-[42px]"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</div>
    </div>
  );
};
