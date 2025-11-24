import React, { useEffect, useRef } from "react";

import step1Img from "@/assets/onboarding/Try-on-Step1.mp4";
import step2Img from "@/assets/onboarding/Try-on-Step2.mp4";
import step3Img from "@/assets/onboarding/Try-on-Step3.mp4";

interface HowItWorksStepProps {
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  onReachBottom?: (atBottom: boolean) => void;
}

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    stepLabel: "01 / 03",
    title: "Step 1: Find",
    descriptionLines: [
      "Scroll through your favorite fashion sites and spot a piece you love.",
      "Find what inspires your next look.",
    ],
    videoSrc: step1Img,
  },
  {
    id: 2,
    stepLabel: "02 / 03",
    title: "Step 2: Right Click",
    descriptionLines: [
      "Right-click the clothing image and select",
      '"Try On Now | fAIshion"',
      "Your try-on will start instantly, no extra steps.",
    ],
    videoSrc: step2Img,
  },
  {
    id: 3,
    stepLabel: "03 / 03",
    title: "Step 3: See your look",
    descriptionLines: [
      "Your personalized try-on is ready!",
      "View your personalized try-on and shine with",
      "confidence.",
    ],
    videoSrc: step3Img,
  },
];

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  onNext,
  onReachBottom,
}) => {
  const total = HOW_IT_WORKS_STEPS.length;

  const rootRef = useRef<HTMLDivElement | null>(null); 
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLDivElement).dataset.index);
          const video = videoRefs.current[idx];
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onReachBottom) return;

    const checkBottom = () => {
      const el = rootRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const thresholdPx = 8; // small tolerance

      // if bottom of this step is within viewport bottom => at bottom
      const atBottom = rect.bottom <= window.innerHeight + thresholdPx;
      onReachBottom(atBottom);
    };

    checkBottom(); // initial
    window.addEventListener("scroll", checkBottom, { passive: true });
    window.addEventListener("resize", checkBottom);

    return () => {
      window.removeEventListener("scroll", checkBottom);
      window.removeEventListener("resize", checkBottom);
    };
  }, [onReachBottom]);

  return (
    <div ref={rootRef} className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Main title */}
      <div className="px-4 md:px-8 mt-8 md:mt-10 text-center">
        <h1
          className="
            mx-auto
            max-w-[638px]
            text-[24px] md:text-[32px] lg:text-[40px]
            leading-[1.1]
            font-bold
            text-[#0A0A0A]
          "
        >
          Generate Your Virtual Try-On
        </h1>
      </div>

      {/* Steps list */}
      <div className="mt-10 md:mt-12 flex-1 flex flex-col px-4 md:px-8 pb-8 md:pb-10">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <div
            key={step.id}
            data-index={index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className="
              w-full max-w-[1054px] mx-auto
              min-h-[584px]
              flex flex-col md:flex-row md:items-center
              gap-8 md:gap-12
            "
          >
            {/* Video on the left */}
            <div className="w-full md:w-[50%] flex justify-center md:justify-start">
              <div className="w-full max-w-[508px] aspect-[508/310] rounded-[32px] overflow-hidden">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={step.videoSrc}
                  className="h-full w-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="none"
                />
              </div>
            </div>

            {/* Text block on the right */}
            <div className="w-full md:w-[50%] flex flex-col justify-center md:items-start items-center text-center md:text-left">
              {/* 01 / 03 */}
              <p className="text-[14px] md:text-[16px] leading-[24px] font-bold text-[#6A5ACD]">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>

              {/* Step title */}
              <h2
                className="
                  mt-2 md:mt-3
                  text-[28px] md:text-[40px] lg:text-[48px]
                  leading-[1.0]
                  font-medium
                  text-[#0A0A0A]
                  max-w-[420px]
                "
              >
                {step.title}
              </h2>

              {/* Body text */}
              <div
                className="
                  mt-3
                  text-[14px] md:text-[18px]
                  leading-[1.2]
                  font-medium
                  text-[#565656]
                  max-w-[465px]
                  whitespace-pre-line
                "
              >
                {step.descriptionLines.map((line, i) => (
                  <p key={`${step.id}-${i}`}>{line}</p>
                ))}
              </div>
              <div
                className="
                  mt-10 md:mt-16
                  flex items-center gap-2
                  text-[12px] md:text-[14px]
                  leading-[20px]
                  text-[#6A7282]
                "
              >
                <span>Scroll to continue</span>
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 border-l-[3.5px] border-b-[3.5px] border-[#767676] rotate-[-45deg]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};
