import React from "react";
import chatbotVideo from "@/assets/onboarding/Screen Recording 2025-11-13 at 10.21.49 PM.mp4";

interface ChatbotStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const ChatbotStep: React.FC<ChatbotStepProps> = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Top row: back + next (no navbar yet) */}
      <div className="w-full pt-6 px-4 md:px-16 flex items-center justify-between">
        {/* Back arrow */}
        <button
          type="button"
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <span
            aria-hidden
            className="inline-block h-5 w-5 border-l-[3.5px] border-b-[3.5px] border-[#767676] rotate-45 translate-x-[1px]"
          />
        </button>

        {/* Right-aligned Next button */}
        <button
            type="button"
            onClick={onNext}
            className="text-xs md:text-sm font-medium text-[#6A7282] hover:text-gray-900"
          >
            Next
          </button>
      </div>

      {/* Title + video */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-16 pb-10">
        {/* Title */}
        <h1 className="mb-8 text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#000000] text-center">
          Chatbot
        </h1>

        {/* Centered video with purple border */}
        <div className="w-full max-w-[640px] aspect-[4/3] flex items-center justify-center">
          <div className="w-full h-full rounded-[32px] border-[3px] border-[#6A5ACD] overflow-hidden bg-white">
            <video
              src={chatbotVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};
