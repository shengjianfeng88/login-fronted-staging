import React from "react";
import chatbotVideo from "@/assets/onboarding/Chatbot-Video.mp4";

interface ChatbotStepProps {
  onBack: () => void;
  onNext: () => void;
}

const QuoteBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="
       rounded-[999px]
      bg-white
      border border-black/5
      shadow-[0_4px_8px_rgba(0,0,0,0.08)]
      px-4 py-2
      text-[12px] sm:text-[13px]
      text-left text-[#111827]
    "
  >
    {children}
  </div>
);

const QuoteWithArrow: React.FC<{
  side: "left" | "right";
  children: React.ReactNode;
}> = ({ side, children }) => (
  <div className="flex items-center gap-2">
    {side === "right" && <QuoteBubble>{children}</QuoteBubble>}

    {/* Placeholder arrow – swap img src with your real asset */}
    <div
      className={`
        w-8 md:w-10 h-8 md:h-10
        ${side === "left" ? "order-first" : "order-last"}
      `}
    >
      {/* Example using borders as a simple curved-ish arrow.
          Replace with an <img src={leftArrow} /> / <img src={rightArrow} /> */}
      <div
        className={`
          w-full h-full border-[2px] border-white
          border-l-transparent border-b-transparent
          rounded-full
          ${side === "left" ? "rotate-[135deg]" : "-rotate-[45deg]"}
        `}
      />
    </div>

    {side === "left" && <QuoteBubble>{children}</QuoteBubble>}
  </div>
);


export const ChatbotStep: React.FC<ChatbotStepProps> = () => {
  
  return (
    <div className="flex flex-col w-full h-full ">
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
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            {/* LEFT QUOTES – hidden on small screens */}
            <div className="hidden md:flex flex-col gap-4 max-w-[260px]">
              <QuoteWithArrow side="right">
                Find sporty outfits with white sneakers 👟
              </QuoteWithArrow>
              <QuoteWithArrow side="right">
                Style a satin midi dress 🧵
              </QuoteWithArrow>
              <QuoteWithArrow side="right">
                Outfits for all-black look 🖤
              </QuoteWithArrow>
            </div>

            {/* ORIGINAL VIDEO CARD – unchanged */}
            <div className="flex justify-center">
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

            {/* RIGHT QUOTES – hidden on small screens */}
            <div className="hidden md:flex flex-col gap-4 max-w-[250px]">
              <QuoteWithArrow side="left">
                Outfits for job interviews 💼
              </QuoteWithArrow>
              <QuoteWithArrow side="left">
                Make outfits with Aritzia Effortless Pants 👖
              </QuoteWithArrow>
              <QuoteWithArrow side="left">
                Make a Y2K inspired outfit ✨
              </QuoteWithArrow>
            </div>
          </div>
        </div>


      </section>
      </div>
  
  );
};
