import React from "react";
import img1 from "../../../../assets/onboarding/9eb5fa570aaeb5b48308abd2f7852bca821aa2d7.png";
import img2 from "../../../../assets/onboarding/e48fee89a7f9d321b7eccde5e50949c5eefefbb9.png";
import img3 from "../../../../assets/onboarding/4fb231c101520b589dd8a6a9ddbdbfaeb0511121.png";

interface SampleModelStepProps {
  onBack: () => void;
  onNext?: () => void;
}

const SAMPLE_MODELS = [
  { id: 1, src: img1, alt: "Curvy model in jeans" },
  { id: 2, src: img2, alt: "Slim model in pink set" },
  { id: 3, src: img3, alt: "Athletic model in leggings" },
];

export const SampleModelStep: React.FC<SampleModelStepProps> = ({
  onBack,
  onNext,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      
      <div className="w-full pt-2 px-4 md:px-16">
        
        <div className="flex items-center justify-between">
          <button
  type="button"
  onClick={onBack}
  className="
    flex items-center justify-center
    w-10 h-10
    rounded-md
    cursor-pointer
    hover:bg-gray-100
    transition-colors
  "
>
  <span
    className="
      block
      w-[20px] h-[20px]
      border-l-[3.5px] border-b-[3.5px]
      border-[#767676]
      rotate-[45deg]
    "
  />
</button>

          {/* Next button on the right */}
          <button
            type="button"
            onClick={onNext}
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-[#1E1E1E]
              px-4 py-2
              text-xs md:text-sm font-medium
              text-white
              shadow-sm
              hover:bg-black
              transition-colors
            "
          >
            Next
            <span className="text-xs md:text-sm">➝</span>
          </button>
        </div>

        {/* Title + subtitle block, centered */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h2 className="text-[24px] md:text-[36px] leading-[32px] md:leading-[36px] font-bold text-[#000000]">
            Choose a Sample Model
          </h2>
          <p className="mt-2 text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-normal text-[#000000]">
            Your can upload your photo anytime for personalized results
          </p>
        </div>
      </div>

      {/* Models row */}
      <div className="mt-10 md:mt-14 flex-1 flex items-center justify-center px-4 md:px-16 pb-10">
        <div
          className="
            flex w-full max-w-5xl
            flex-col items-center gap-6
            sm:flex-row sm:justify-center sm:items-stretch
          "
        >
          {SAMPLE_MODELS.map((model) => (
            <div
              key={model.id}
              className="
                relative
                w-[220px] h-[340px]
                sm:w-[250px] sm:h-[403px]
                bg-white
              "
            >
              <img
                src={model.src}
                alt={model.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
