import React from "react";
import chatbotVideo from "@/assets/onboarding/F-Action-Button.mp4";

import chatbot from "@/assets/onboarding/Chatbot.png";
import fbutton from "@/assets/onboarding/F-Button.png";
import sizerecommendation from "@/assets/onboarding/SizeRecommendation.png";
import tryonhistory from "@/assets/onboarding/TryOn-History.png";

interface ShortcutProps {
  onBack: () => void;
  onNext: () => void;
}

const F_BUTTON_FEATURES = [
  {
    id: "fab",
    title: "Floating Action Button",
    body:
      "Shows the progress of your virtual try-on as it loads. When you click it, you can view your completed try-on, check the deals tab, and quickly return to your results.",
    iconSrc: fbutton,
  },
  {
    id: "history",
    title: "Try-On History",
    body:
      "Open your personal dashboard to see every outfit you’ve tried on. Revisit past looks, compare favorites, and jump back into items you want to explore again.",
    iconSrc: tryonhistory,
  },
  {
    id: "chatbot",
    title: "AI Stylist Chatbot",
    body:
      "Describe what you’re looking for and get outfit ideas or help finding similar items. Your styling support is always one message away.",
    iconSrc: chatbot,
  },
  {
    id: "size",
    title: "Size Recommendation",
    body:
      "Check your best-fitting size instantly. Open a size chart and get a personalized recommendation based on your saved measurements.",
    iconSrc: sizerecommendation,
  },
];

export const ShortcutProps: React.FC<ShortcutProps> = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <section className="w-full flex flex-col items-center mt-10">
        {/* title + desc */}
        <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px] px-4">
          <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
            Floating Action Button
          </h2>
          <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
            Gives you access to Virtual Try-On, Size Recommendation, and AI Stylist
            Chatbot when you hover over it.
          </p>
        </div>

        {/* video block */}
        <div className="w-full flex justify-center mt-8 px-4">
          <div
            className="
              w-full max-w-[628px]
              aspect-[628/373]
              rounded-[7px]
              border-[7px] border-[#6A5ACD]
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

        {/* features grid */}
        <div
          className="
            w-full max-w-[1180px]
            mx-auto mt-10 md:mt-12
            px-6 py-6 md:px-10 md:py-6
          "
        >
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              gap-8 lg:gap-10
              items-start
              text-center
            "
          >
            {F_BUTTON_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center gap-[27px] min-w-[220px]"
              >
                <div
                  className="
                    w-[66px] h-[66px] rounded-[18px] overflow-hidden
                  "
                >
                  {feature.iconSrc ? (
                   <img
  src={feature.iconSrc}
  alt={feature.title}
  className="w-full h-full object-cover scale-[1.5]"
  draggable={false}
/>
                  ) : (
                    <div className="w-[66px] h-[66px]" />
                  )}
                </div>

                <h3
                  className="
                    text-[22px] md:text-[22px]
                    font-bold
                    text-[#1E1E1E]
                    leading-[1.2]
                    tracking-[-0.02em]
                  "
                >
                  {feature.title}
                </h3>

                {/* Body */}
                <p
                  className="
                    text-[14px]
                    font-medium
                    text-[#757575]
                    leading-[1.4]
                    max-w-[251px]
                  "
                >
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
