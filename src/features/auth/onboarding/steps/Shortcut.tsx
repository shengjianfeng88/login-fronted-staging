import React from "react";
import chatbotVideo from "@/assets/onboarding/Frame-1707482883.mp4";

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
    // iconSrc: ...
    iconBg: "#6A5ACD",
    iconText: "F.",
    iconTextColor: "#FFFFFF",
  },
  {
    id: "history",
    title: "Try-On History",
    body:
      "Open your personal dashboard to see every outfit you’ve tried on. Revisit past looks, compare favorites, and jump back into items you want to explore again.",
    // iconSrc: ...
  },
  {
    id: "chatbot",
    title: "AI Stylist Chatbot",
    body:
      "Describe what you’re looking for and get outfit ideas or help finding similar items. Your styling support is always one message away.",
    // iconSrc: ...
  },
  {
    id: "size",
    title: "Size Recommendation",
    body:
      "Check your best-fitting size instantly. Open a size chart and get a personalized recommendation based on your saved measurements.",
    // iconSrc: ...
  },
];

export const ShortcutProps: React.FC<ShortcutProps> = () => {
  return (
    <div className="flex flex-col w-full h-full">
      
      <section className="w-full flex flex-col items-center mt-10">
        {/* title + desc */}
        <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px]">
          <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
            Floating Action Button
          </h2>
          <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
            Gives you access to Virtual Try-On, Size Recommendation, and AI Stylist Chatbot  when you hover over it.
          </p>
        </div>

        {/* video block (unchanged) */}
        <div className="w-full flex justify-center mt-8">
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

        {/* ✅ UPDATED WHITE WRAPPER */}
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
                className="
                  flex flex-col items-center gap-[27px] min-w-[240px]
                "
              >
                {/* Icon chip */}
                <div
                  className="
                    w-[66px] h-[66px]
            rounded-[17.71px]
            bg-white
            shadow-[0_4.43px_22.14px_rgba(0,0,0,0.10)]
            flex items-center justify-center
                  "
                  style={{ background: feature.iconBg || "#FFFFFF" }}
                >
                  {feature.iconText ? (
                    <span
                      className="text-[22px] font-bold"
                      style={{ color: feature.iconTextColor || "#000000" }}
                    >
                      {feature.iconText}
                    </span>
                  ) : (
                    <div className="text-sm">Icon</div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[24px] md:text-[22px]
            font-bold
            text-[#1E1E1E]
            leading-[1.2]
            tracking-[-0.02em]">
                  {feature.title}
                </h3>

                {/* Body */}
                <p className="text-[14px]
            font-medium
            text-[#757575]
            leading-[1.4]
            max-w-[251px]">
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
