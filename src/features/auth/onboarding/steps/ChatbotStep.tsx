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

     <section className="w-full flex flex-col items-center mt-10">
  {/* title + description block */}
  <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px]">
    <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
      Chatbot
    </h2>
    <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
      Ask for outfit ideas, explore new looks, or get help styling for any
      occasion, all with one quick message.
    </p>
  </div>

       
        <div className="mt-10 w-full flex justify-center">
    <div
      className="
        w-full max-w-[602px]
        aspect-[602/486]
        rounded-[18px]
        border-[7px] border-[#6A5ACD]
        shadow-[0_4px_14.7px_rgba(0,0,0,0.25)]
        overflow-hidden bg-white
      "
    >
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
      </section>
      </div>
  
  );
};
