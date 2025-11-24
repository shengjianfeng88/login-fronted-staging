import React from "react";
import chatbotVideo from "@/assets/onboarding/Try-on History.mp4";

interface AllinOnePlaceProps {
  onBack: () => void;
  onNext: () => void;
}

export const AllinOnePlaceProps: React.FC<AllinOnePlaceProps> = () => {
  return (
    <div className="flex flex-col w-full h-full">
     
     <section className="w-full flex flex-col items-center mt-10">
  {/* title + description block */}
  <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px]">
    <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
      Try-On History
    </h2>
    <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
      Look back at every outfit you've tried and revisit your favorites anytime.
    </p>
  </div>

       
        <div className="w-full flex justify-center mt-8">
    <div
      className="
          w-full
      max-w-[814px]         
      aspect-[814/458]      
      rounded-[18px]
      border-[7px] border-[#6A5ACD]
      bg-white
      shadow-[0_4px_4px_rgba(0,0,0,0.25)]
      overflow-hidden
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
