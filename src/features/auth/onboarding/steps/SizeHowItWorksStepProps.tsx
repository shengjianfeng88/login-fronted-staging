import React from "react";
// TODO: replace these with real video/image imports when ready
import step1Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.14.55 PM.mp4";
import step2Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.21.26 PM.mp4";
import step3Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.28.18 PM.mp4";
import step4Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.32.23 PM.mp4";
import step5Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.36.09 PM.mp4";
import step6Media from "@/assets/onboarding/Screen Recording 2025-11-13 at 9.39.17 PM.mp4";

interface SizeHowItWorksStepProps {
  onBack: () => void;
  onEndChange?: (atEnd: boolean) => void;
}

const SIZE_STEPS = [
  {
    id: 1,
    title: "1. Enter your measurements",
    body:
      "Open the fAIshion.AI extension and add your\nBust, Waist, and Hip measurements.",
    media: step1Media,
  },
  {
    id: 2,
    title: "2. Open the product you want sized",
    body:
      "Browse any fashion website and select the item\nyou want to size.",
    media: step2Media,
  },
  {
    id: 3,
    title: "3. Tap the size guide",
    body:
      "Scroll to the product’s Size Guide and open it.\n Make sure the size chart is fully visible on your \n screen.",
    media: step3Media,
  },
  {
    id: 4,
    title: "4. Choose Size Recommendation",
    body:
      "Open your fAIshion.AI extension, head to \nSizing, and click Size Recommendation to\n begin.",
    media: step4Media,
  },
  {
    id: 5,
    title: "5. Your recommended size is ready",
    body:
      "You’re all set! Your recommended size is \nhighlighted, along with options if you prefer a \nsnug or relaxed fit",
    media: step6Media,
  },
];

export const SizeHowItWorksStep: React.FC<SizeHowItWorksStepProps> = ({
  onBack,
  onSkip,
  onNext,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
     


      {/* Main content */}
      <main className="flex-1 px-4 md:px-8 lg:px-16 pb-10 pt-6">
        {/* Page title */}
        {/* Page title + subtitle */}
<div className="text-center mb-10 md:mb-12">
  <h1 className="mx-auto max-w-[806px] text-[28px] md:text-[36px] lg:text-[48px] font-bold leading-[1.1] text-[#000000]">
    Get Your Size Recomendation
  </h1>
</div>


        {/* Steps */}
        <div>
          {SIZE_STEPS.map((step, index) => {
            const isReversed = index % 2 === 1;

            return (
              <section
                key={step.id}
               className={`flex flex-col gap-6 md:gap-10 lg:gap-12 items-center mx-auto w-full max-w-[1106px] ${
    isReversed ? "md:flex-row-reverse" : "md:flex-row"
  } ${index > 0 ? "mt-[120px] md:mt-[150px]" : ""}`}
              >
                {/* Text block */}
                <div className="w-full md:w-[48%]">
                  <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-[1] text-[#000000] mb-3">
                    {step.title}
                  </h2>
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#565656] leading-[1.3] whitespace-pre-line">
                    {step.body}
                  </p>
                </div>

                {/* Video / image card */}
                <div className="w-full md:w-[52%] flex justify-center">
                  <div className="w-full max-w-[562px] aspect-[562/351] rounded-[18px] border-[6px] border-[#6A5ACD] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] overflow-hidden">
                    <video
                      src={step.media}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                    preload="none"
                      playsInline
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <footer className="flex justify-end px-4 md:px-8 pb-6 md:pb-8">
  <button
    type="button"
    onClick={onNext}
    className="
     inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6A5ACD] to-[#8E7BFF] px-6 md:px-7 py-2 md:py-2.5 text-[13px] md:text-[15px] font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
  >
    <span>Next</span>
     <span
      aria-hidden
      className="inline-block h-2 w-2 border-r-[2px] border-b-[2px] border-white rotate-[-45deg] translate-y-[1px]"
    />

  </button>
</footer>

    </div>
  );
};
