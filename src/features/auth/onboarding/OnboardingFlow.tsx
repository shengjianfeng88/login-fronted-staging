import React, { useState, useMemo, useEffect } from "react";
import { OnboardingHeader } from "./OnboardingTopBar";
import { PinToolbarStep } from "./steps/PinToolbarStep";
import { ChooseViewerStep } from "./steps/ChooseViewerStep";
import { SampleModelStep } from "./steps/SampleModelStep";
import { UploadPhotoStep } from "./steps/UploadPhotoStep";
import { HowItWorksStep } from "./steps/HowItWorksStep";
import { ChatbotStep } from "./steps/ChatbotStep";
import { SizeHowItWorksStep } from "./steps/SizeHowItWorksStepProps";
import { AllinOnePlaceProps } from "./steps/AllinOnePlace";
import { ShortcutProps } from "./steps/Shortcut";
import { DoneStep } from "./steps/DoneStepProps";

const scrollToOnboardingTop = () => {
  window.scrollTo({ top: 0, behavior: "auto" });
};

type Step =
  | "pinToolbar"
  | "chooseViewer"
  | "sampleModel"
  | "uploadOwnPhoto"
  | "howItWorks"
  | "SizeHowItWorksStep"
  | "chatbot"
  | "AllinOnePlaceProps"
  | "ShortcutProps"
  | "DoneStep";

const STEP_ORDER: Step[] = [
  "pinToolbar",
  "chooseViewer",
  "sampleModel",
  "uploadOwnPhoto",
  "howItWorks",
  "SizeHowItWorksStep",
  "chatbot",
  "AllinOnePlaceProps",
  "ShortcutProps",
  "DoneStep",
];

const STEPS_WITH_CONTROLS = new Set<Step>([
  "sampleModel",
  "uploadOwnPhoto",
  "howItWorks",
  "SizeHowItWorksStep",
  "chatbot",
  "AllinOnePlaceProps",
  "ShortcutProps",
  "DoneStep",
]);

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState<Step>("pinToolbar");
  const [skipReady, setSkipReady] = useState(false);
  const goDoneStep = () => setStep("DoneStep");

  const stepIndex = useMemo(() => STEP_ORDER.indexOf(step), [step]);
  const progress = stepIndex <= 0 ? 0 : stepIndex / (STEP_ORDER.length - 1);
  const showControls = STEPS_WITH_CONTROLS.has(step);

   useEffect(() => {
    setSkipReady(false);
  }, [step]);

  const backHandler = () => {
    switch (step) {
      case "sampleModel":
      case "uploadOwnPhoto":
        return setStep("chooseViewer");
      case "howItWorks":
        scrollToOnboardingTop();
        return setStep("chooseViewer");
      case "SizeHowItWorksStep":
        scrollToOnboardingTop();  
        return setStep("howItWorks");
      case "chatbot":
        return setStep("SizeHowItWorksStep");
      case "AllinOnePlaceProps":
        return setStep("chatbot");
      case "ShortcutProps":
        return setStep("AllinOnePlaceProps");
      case "DoneStep":
        return setStep("ShortcutProps");
      default:
        return;
    }
  };

  const nextHandler = () => {
    switch (step) {
      case "sampleModel":
      case "uploadOwnPhoto":
        scrollToOnboardingTop();
        return setStep("howItWorks");
      case "howItWorks":
        scrollToOnboardingTop();
        return setStep("SizeHowItWorksStep");
      case "SizeHowItWorksStep":
        scrollToOnboardingTop();
        return setStep("chatbot");
      case "chatbot":
        return setStep("AllinOnePlaceProps");
      case "AllinOnePlaceProps":
        return setStep("ShortcutProps");
      case "ShortcutProps":
        return setStep("DoneStep");
      case "DoneStep":
        return goDoneStep();
      default:
        return;
    }
  };

  const isSkipStep =
    step === "howItWorks" || step === "SizeHowItWorksStep";

  const headerNextLabel =
  isSkipStep && !skipReady ? "Skip" : "Next";
  const headerNextHandler =
  step === "DoneStep" ? undefined : nextHandler;

  return (
    <main className="min-h-screen bg-white">
      <OnboardingHeader
        progress={progress}
        showControls={showControls}
        onBack={backHandler}
        onNext={headerNextHandler}
        nextLabel={headerNextLabel}
      />

      <section className="flex min-h-[60vh] md:min-h-[75vh] items-start md:items-center justify-center">
        <div className="w-full max-w-[1240px] transition-all duration-300">
          {step === "pinToolbar" && (
            <PinToolbarStep onNext={() => setStep("chooseViewer")} />
          )}

          {step === "chooseViewer" && (
            <ChooseViewerStep
              onSelectOwnPhoto={() => setStep("uploadOwnPhoto")}
              onSelectSampleModel={() => setStep("sampleModel")}
            />
          )}

          {step === "sampleModel" && (
            <SampleModelStep
              onBack={() => setStep("chooseViewer")}
              onNext={() => setStep("howItWorks")}
            />
          )}

          {step === "uploadOwnPhoto" && (
            <UploadPhotoStep
              onBack={() => setStep("chooseViewer")}
              onNext={() => setStep("howItWorks")}
            />
          )}

          {step === "howItWorks" && (
            <HowItWorksStep
              onBack={() => setStep("chooseViewer")}
              onSkip={() => setStep("SizeHowItWorksStep")}                
              onNext={() => setStep("SizeHowItWorksStep")}
              onReachBottom={(atBottom) => {
      if (atBottom) setSkipReady(true);
    }}
            />
          )}

          {step === "SizeHowItWorksStep" && (
            <SizeHowItWorksStep
              onBack={() => setStep("howItWorks")}
              onSkip={() => setStep("chatbot")}                 
              onNext={() => setStep("chatbot")}
              onReachBottom={(atBottom) => {
      if (atBottom) setSkipReady(true); 
    }}
            />
          )}

          {step === "chatbot" && (
            <ChatbotStep
              onBack={() => setStep("SizeHowItWorksStep")}
              onNext={() => setStep("AllinOnePlaceProps")}
            />
          )}

          {step === "AllinOnePlaceProps" && (
            <AllinOnePlaceProps
              onBack={() => setStep("chatbot")}
              onNext={() => setStep("ShortcutProps")}
            />
          )}

          {step === "ShortcutProps" && (
            <ShortcutProps
              onBack={() => setStep("AllinOnePlaceProps")}
              onNext={() => setStep("DoneStep")}
            />
          )}

          {step === "DoneStep" && (
            <DoneStep onBack={() => setStep("ShortcutProps")} />
          )}
        </div>
      </section>
    </main>
  );
};
