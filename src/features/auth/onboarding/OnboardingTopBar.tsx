// OnboardingTopBar.tsx
import React from "react";
import imglogo from "@/assets/onboarding/fAIshion-logo.png";

interface OnboardingHeaderProps {
  showNavbar?: boolean;
  /** Which logical step is active (e.g. "howItWorks") */
  activeStepId?: string;
  /** Whether to show the center control area (back/next row) */
  showControls?: boolean;
  /** Whether to show the multi-step progress bar */
  showStepper?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  rightSlot?: React.ReactNode;
  onStepClick?: (stepId: string) => void;
}

const STEPS: { id: string; label: string; icon?: React.ReactNode }[] = [
  { id: "pinToolbar",        label: "pinToolbar",        icon: "🔧" },
  { id: "chooseViewer",      label: "chooseViewer",      icon: "🖼️" },
  { id: "howItWorks",        label: "howItWorks",        icon: "▶" },
  { id: "SizeHowItWorksStep",label: "SizeHowItWorksStep",icon: "S" },
  { id: "chatbot",           label: "chatbot",           icon: "💬" },
  { id: "AllinOnePlaceProps",label: "AllinOnePlaceProps",icon: "A" },
  { id: "ShortcutProps",     label: "ShortcutProps",     icon: "⏱" },
];

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  showNavbar = true,
  activeStepId,
  showControls = false,
  showStepper = true,
  onBack,
  onNext,
  nextLabel = "Next",
  rightSlot,
  onStepClick,
}) => {
  const currentStepIndex = activeStepId
    ? STEPS.findIndex((s) => s.id === activeStepId)
    : -1;

  const hasStepper =
    showStepper && currentStepIndex >= 0 && currentStepIndex < STEPS.length;

  return (
    <div className="w-full sticky top-0 z-50 bg-white">
      {/* Top logo nav */}
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
              className="h-[18px] md:h-[20px] lg:h-[24px] w-auto object-contain select-none"
              draggable={false}
            />
          </div>
          {rightSlot ? rightSlot : <div className="w-6" />}
        </header>
      )}

      {showControls && (
        <>
          <div className="w-full bg-white">
            <div
              className="
                flex items-center
                h-[90px]
                px-[16px]
                md:px-[24px]
                lg:px-[32px]
                gap-2 md:gap-4
              "
            >
              {/* Back button (left) */}
              <button
                type="button"
                onClick={onBack}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 shrink-0"
                aria-label="Back"
              >
                <span
                  aria-hidden
                  className="inline-block h-3 w-3 border-l-[3.5px] border-b-[3.5px] border-[#767676] rotate-45 translate-x-[1px]"
                />
              </button>

              {/* Center: either stepper or just empty spacer to keep layout */}
              <div className="flex-1 flex items-center justify-center">
                {hasStepper ? (
                  <div className="flex items-center w-full max-w-[720px] gap-2 md:gap-4">
                    {STEPS.map((step, index) => {
                      const isActive = index === currentStepIndex;
                      const isCompleted = index < currentStepIndex;

                      return (
                      
  <div
    key={step.id}
    onClick={onStepClick ? () => onStepClick(step.id) : undefined}
    className={`
      flex-1 flex flex-col items-center min-w-0
      ${onStepClick ? "cursor-pointer" : ""}
    `}
  >
    <div className="flex items-center w-full">
      {/* left connector with small gap */}
      {index > 0 && (
        <div className="flex-1 h-[2px] bg-[#D2D8E4] mr-2" />
      )}

      {/* circle with centered icon */}
      <div
        className={`
          flex items-center justify-center
          flex-none
          h-8 w-8 md:h-9 md:w-9
          rounded-full border-[2px]
          ${
            isActive
              ? "bg-[#6A5ACD] border-[#6A5ACD] text-white shadow-sm"
              : isCompleted
              ? "border-[#6A5ACD] bg-white text-[#111827]"
              : "border-[#D2D8E4] bg-white text-[#111827]"
          }
        `}
      >
        {step.icon && (
          <span className="inline-flex items-center justify-center text-[14px] leading-none">
            {step.icon}
          </span>
        )}
      </div>

      {/* right connector with small gap */}
      {index < STEPS.length - 1 && (
        <div className="flex-1 h-[2px] bg-[#D2D8E4] ml-2" />
      )}
    </div>


                          <div
                            className={`
                              mt-1 text-[9px] md:text-[11px] text-center truncate
                              ${
                                isActive
                                  ? "text-[#6A5ACD] font-semibold"
                                  : "text-[#8C8C8C]"
                              }
                            `}
                          >
                            {step.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // just keep spacing when there's no stepper
                  <div className="w-full max-w-[720px]" />
                )}
              </div>

              {/* Next / Skip (right) */}
              {onNext && (
                (() => {
                  const isSkip =
                    (nextLabel || "").toLowerCase() === "skip";

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
                        shrink-0
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
        </>
      )}
    </div>
  );
};
