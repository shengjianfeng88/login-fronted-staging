import React from "react";
import chatbotVideo from "@/assets/onboarding/Chatbot-Video.mp4";

interface ChatbotStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const ChatbotStep: React.FC<ChatbotStepProps> = () => {
  
  return (
    <div className="flex flex-col w-full h-full">
     <section className="w-full flex flex-col items-center">
  <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px]">
    <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
      AI Stylist Chatbot
    </h2>
    <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
      Ask for outfit ideas, explore new looks, or get help styling for any occasion, instantly
    </p>
  </div>

       
        <div className="mt-8 w-full flex justify-center">
  <div
    className="
      w-full
      max-w-[340px]
      sm:max-w-[400px]
      md:max-w-[460px]
      lg:max-w-[520px]
      aspect-[602/486]
      rounded-[18px]
      border-[7px] border-[#6A5ACD]
      shadow-[0_4px_14.7px_rgba(0,0,0,0.25)]
      overflow-hidden bg-white relative
    "
  >
    <video
      src={chatbotVideo}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      controls
    />
  </div>
</div>

      </section>
      </div>
  
  );
};
