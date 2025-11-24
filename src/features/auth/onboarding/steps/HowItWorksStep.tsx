import React,{useEffect,useRef} from "react";

import step1Img from "@/assets/onboarding/zara lookup video.mp4";
import step2Img from "@/assets/onboarding/Screen Recording 2025-11-12 at 4.20.19 PM.mp4";
import step3Img from "@/assets/onboarding/Screen Recording 2025-11-12 at 4.24.06 PM.mp4";

interface HowItWorksStepProps {
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
}

const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    stepLabel: "01 / 03",
    title: "Step 1: Find",
    descriptionLines: [
      "Scroll through your favorite fashion sites and spot a piece you love.",
      "Find what inspires your next look.",],
    videoSrc: step1Img,
  },
  {
    id: 2,
    stepLabel: "02 / 03",
    title: "Step 2: Right Click",
     descriptionLines: [
      'Right-click the clothing image and select',
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
      "View your personalized try-on and flaunt your style ",
      "with confidence."
    ],
    videoSrc: step3Img,
  },
];

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  onBack,
  onSkip,
  onNext,
}) => {
  const total = HOW_IT_WORKS_STEPS.length;

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const container = entry.target as HTMLDivElement;
          const video = container.querySelector("video") as
            | HTMLVideoElement
            | null;
          if (!video) return;

          if (entry.isIntersecting) {
        
            video
              .play()
              .catch(() => {
                
              });
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">    
      
        <header className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-5">
         
         

          
        </header>

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
            See your style come alive in 3 simple steps
          </h1>
        </div>

        {/* Steps list */}
        <div className="mt-10 md:mt-12 flex-1 flex flex-col px-4 md:px-8 pb-8 md:pb-10">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.id}
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
                <h2 className="  mt-2 md:mt-3
    text-[28px] md:text-[40px] lg:text-[48px]
    leading-[1.0]
    font-medium
    text-[#0A0A0A]
    max-w-[420px]">
                  {step.title}
                </h2>

                {/* Body text */}
                <p className=" mt-3
    text-[14px] md:text-[18px]
    leading-[1.2]
    font-medium
    text-[#565656]
    max-w-[465px]
    whitespace-pre-line">
                 {step.descriptionLines.map((line) => (
    <p key={line}>{line}</p>
  ))}
                </p>

                {/* “Scroll to continue” a bit lower */}
                <div className="mt-10 md:mt-16
    flex items-center gap-2
    text-[12px] md:text-[14px]
    leading-[20px]
    text-[#6A7282]">
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

        {/* Bottom next button */}
        <div className="flex justify-end px-4 md:px-8 pb-6 md:pb-8">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-[#7764EC] px-6 md:px-7 py-2 md:py-2.5 text-[13px] md:text-[15px] font-semibold text-white shadow-sm hover:bg-[#5b4bc2] transition-colors"
          >
            <span>Next</span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 border-r-[2px] border-b-[2px] border-white rotate-[-45deg] translate-y-[1px]"
            />
          </button>
        </div>
          
    </div>
  );
};
