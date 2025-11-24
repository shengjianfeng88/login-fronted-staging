import React, { useState } from "react";
import img1 from "../../../../assets/onboarding/9eb5fa570aaeb5b48308abd2f7852bca821aa2d7.png";
import img2 from "../../../../assets/onboarding/e48fee89a7f9d321b7eccde5e50949c5eefefbb9.png";
import img3 from "../../../../assets/onboarding/4fb231c101520b589dd8a6a9ddbdbfaeb0511121.png";
import img4 from "../../../../assets/onboarding/4f4f4fb229ebea5703dc10cff3eb4d51ad8b6c17.png";
import img5 from "../../../../assets/onboarding/89eb2bf04f8e19a3a5bd3e01c2fcc776ac261867.png";
import img6 from "../../../../assets/onboarding/b81268bdbdec78b91d74e738e59edcb7fce6df73.png";


interface SampleModelStepProps {
  onBack: () => void;
  onNext?: () => void;
}

const SAMPLE_MODELS = [
  { id: 1, src: img1, alt: "Curvy model in jeans" },
  { id: 2, src: img2, alt: "Slim model in pink set" },
  { id: 3, src: img3, alt: "Athletic model in leggings" },
  { id: 4, src: img5, alt: "Curvy model in jeans" },
  { id: 5, src: img4, alt: "Slim model in pink set" },
  { id: 6, src: img6, alt: "Athletic model in leggings" },
];

export const SampleModelStep: React.FC<SampleModelStepProps> = ({ onBack,onNext }) => {
  const [selectedId, setSelectedId] = useState<number | null>(SAMPLE_MODELS[0]?.id ?? null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      {/* Header */}
      {/* Header */}
<div className="w-full px-4 md:px-8 pt-8">
  <div className="flex items-center justify-between max-w-[1280px] mx-auto">
  

    {/* Title + subtitle */}
    <div className="flex-1 flex flex-col items-center text-center">
      <h2 className="text-[24px] md:text-[32px] leading-[1.1] font-bold text-[#000000]">
        Choose a Sample Model
      </h2>
      <p className="mt-2
    text-[14px] md:text-[18px] lg:text-[20px]
    leading-[1.2]
    font-normal
    text-[#000000]
    max-w-[1173px] mx-auto text-center">
        Select a model that feels like you
      </p>
    </div>

    
  </div>
</div>


      {/* Models row */}
      <div className="w-full mt-10 md:mt-14 pb-10 px-4 md:px-8 flex justify-center">
        <div
          className="
             flex w-full max-w-[1217px]
      flex-wrap
      justify-center
      gap-[10px]
      md:flex-nowrap md:justify-center
          "
        >
          {SAMPLE_MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => handleSelect(model.id)}
              className="
                 relative
          w-[45%]
          max-w-[190px]
          aspect-[190/308]
          bg-white
          transition-all duration-200
          focus:outline-none
          md:w-[190px] md:h-[308px] md:aspect-auto
              "
            >
              <img
                src={model.src}
                alt={model.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

