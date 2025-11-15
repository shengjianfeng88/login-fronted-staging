import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PinToolbarStep } from "./steps/PinToolbarStep";
import { ChooseViewerStep } from "./steps/ChooseViewerStep";
import { SampleModelStep } from "./steps/SampleModelStep";
// If you don't have this yet, you can create a simple placeholder component
import { UploadPhotoStep } from "./steps/UploadPhotoStep";
import { HowItWorksStep } from "./steps/HowItWorksStep";
import { ChatbotStep } from "./steps/ChatbotStep";

type Step = "pinToolbar" | "chooseViewer" | "sampleModel" | "uploadOwnPhoto" | "howItWorks"| "chatbot";

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState<Step>("pinToolbar");
  const navigate = useNavigate();

  const goDone = () => {
    navigate("/done");
  };

  return (
    <main className="min-h-screen">
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl transition-all duration-300">
          {/* 1. First screen: Pin toolbar */}
          {step === "pinToolbar" && (
            <PinToolbarStep onNext={() => setStep("chooseViewer")} />
          )}

          {/* 2. Who do you want to see it on? */}
          {step === "chooseViewer" && (
            <ChooseViewerStep
              onSelectOwnPhoto={() => setStep("uploadOwnPhoto")}
              onSelectSampleModel={() => setStep("sampleModel")}
            />
          )}

          {/* 3a. Choose a sample model */}
          {step === "sampleModel" && (
            <SampleModelStep
              onBack={() => setStep("chooseViewer")}
              onNext={() => setStep("howItWorks")} 
            />
          )}

          {/* 3b. Use your own photo */}
          {step === "uploadOwnPhoto" && (
            <UploadPhotoStep
              onBack={() => setStep("chooseViewer")}
              onNext={() => setStep("howItWorks")}  
            />
          )}

          {/* 4. See your style in 3 steps */}
          {step === "howItWorks" && (
            <HowItWorksStep
              onBack={() => setStep("chooseViewer")}
              onSkip={goDone}
              onNext={() => setStep("chatbot")}
            />
          )}

 {/* 6. See your style in 3 steps */}
          {step === "chatbot" && (
  <ChatbotStep
    onBack={() => setStep("howItWorks")}
    onNext={goDone}
  />
)}
        </div>
      </section>
    </main>
  );
};
