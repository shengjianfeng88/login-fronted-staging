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
  const leftFeatures = F_BUTTON_FEATURES.filter(
    (f) => f.id === "fab" || f.id === "history"
  );
  const rightFeatures = F_BUTTON_FEATURES.filter(
    (f) => f.id === "chatbot" || f.id === "size"
  );


  return (
    <div className="flex flex-col w-full h-full bg-white">
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px] px-4">
          <h2 className="text-[29px] md:text-[37px] lg:text-[45px] font-bold text-[#000000]">
            Floating Action Button
          </h2>
          <p className="text-[16px] md:text-[18px] font-normal text-[#000000] leading-[1.3]">
            Gives you access to Virtual Try-On, Size Recommendation, and AI
            Stylist Chatbot when you hover over it.
          </p>
        </div>

        {/* main layout: left features – center video – right features */}
        <div className="w-full max-w-[1280px] mx-auto mt-8 md:mt-10 px-4 md:px-6 lg:px-10">
          <div
            className="
              grid grid-cols-1
              gap-10 md:gap-12
              items-center
              md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)]
            "
          >
            {/* LEFT features column */}
            <div className="flex flex-col gap-8 md:gap-10 items-center text-center">
              {leftFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-center gap-[18px] max-w-[260px]"
                >
                  <div className="w-[50px] h-[50px] rounded-[18px] overflow-hidden">
                    {feature.iconSrc && (
                      <img
                        src={feature.iconSrc}
                        alt={feature.title}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    )}
                  </div>

                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#1E1E1E] leading-[1.2] tracking-[-0.02em]">
                    {feature.title}
                  </h3>

                  <p className="text-[12px] font-inter text-[#757575] leading-[1.4]">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center">
              <div
                className="
                  w-full max-w-[546px]
                  aspect-[546/325]
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
                  controls
                />
              </div>
            </div>

            {/* RIGHT features column */}
            <div className="flex flex-col gap-8 md:gap-10 items-center text-center">
              {rightFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-center gap-[18px] max-w-[260px]"
                >
                  <div className="w-[50px] h-[50px] rounded-[18px] overflow-hidden">
                    {feature.iconSrc && (
                      <img
                        src={feature.iconSrc}
                        alt={feature.title}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    )}
                  </div>

                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#1E1E1E] leading-[1.2] tracking-[-0.02em]">
                    {feature.title}
                  </h3>

                  <p className="text-[12px] font-inter text-[#757575] leading-[1.4]">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
