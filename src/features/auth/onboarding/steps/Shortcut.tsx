import React from "react";
import chatbotVideo from "@/assets/onboarding/Frame-1707482883.mp4";

interface ShortcutProps {
  onBack: () => void;
  onNext: () => void;
}

const F_BUTTON_FEATURES = [
  {
    id: "history",
    title: "Try-On History",
    body:
      "Open your personal dashboard to see every outfit you've tried on, revisit past looks, compare favorites, and jump back into items you want to explore again.",
  },
  {
    id: "chatbot",
    title: "Chatbot",
    body:
      "Describe what you're looking for and our outfit ideas help you find similar items. Your styling support is always one message away.",
  },
  {
    id: "size",
    title: "Size Recommendation",
    body:
      "Check your best-fitting size instantly. Open a size chart and get a personalized recommendation based on your saved measurements.",
  },
];

export const ShortcutProps: React.FC<ShortcutProps> = ({ onBack, onNext }) => {
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
      Your shortcut to every feature
    </h2>
    <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
      A floating button that gives you quick access to Try-On, Sizing, and Chat tools when you hover over it.
    </p>
  </div>

       
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
             {/* FEATURES STRIP */}
      <div className="w-full mt-10 px-4 md:px-8 lg:px-16 pb-10">
        <div
          className="
            mx-auto w-full max-w-[1111px]
            rounded-[7px]
            px-4 py-6 md:px-8 md:py-7
          "
        >
          <div
            className="
              flex flex-col md:flex-row
              gap-6 md:gap-[27px]
            "
          >
            {F_BUTTON_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex-1 flex items-start gap-4"
              >
                {/* Icon pill */}
                <div className="mt-1 shrink-0">
                  <div
                    className="
                      h-[66px] w-[66px]
                      rounded-[18px]
                      bg-white
                      shadow-[0_4px_22px_rgba(0,0,0,0.10)]
                      flex items-center justify-center
                    "
                  >
                    {/* TODO: replace with real SVG icon */}
                    <span className="text-[24px]">🙂</span>
                  </div>
                </div>

                {/* Text block */}
                <div>
                  <h3 className="text-[18px] font-semibold text-[#1E1E1E] leading-[1.2] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] font-medium leading-[1.4] text-[#757575]">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      </section>
      </div>
  
  );
};
