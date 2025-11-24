import React from "react";
import Slider from "react-infinite-logo-slider";
import nike from "@/assets/fAIshion_logo.avif";
import fendi from "@/assets/fAIshion_logo.avif";
import tommy from "@/assets/fAIshion_logo.avif";
import burberry from "@/assets/fAIshion_logo.avif";
import zara from "@/assets/fAIshion_logo.avif";
import uniqlo from "@/assets/fAIshion_logo.avif";
import ralph from "@/assets/fAIshion_logo.avif";
import chanel from "@/assets/fAIshion_logo.avif";
import levis from "@/assets/fAIshion_logo.avif";
import gap from "@/assets/fAIshion_logo.avif";

interface DoneStepProps {
  onBack: () => void; 
}

const BRANDS = [
  { id: "nike", src: nike, alt: "Nike" },
  { id: "fendi", src: fendi, alt: "Fendi" },
  { id: "tommy", src: tommy, alt: "Tommy Hilfiger" },
  { id: "burberry", src: burberry, alt: "Burberry" },
  { id: "zara", src: zara, alt: "Zara" },
  { id: "uniqlo", src: uniqlo, alt: "Uniqlo" },
  { id: "ralph", src: ralph, alt: "Ralph Lauren" },
  { id: "chanel", src: chanel, alt: "Chanel" },
  { id: "levis", src: levis, alt: "Levi's" },
  { id: "gap", src: gap, alt: "GAP" },
];

export const DoneStep: React.FC<DoneStepProps> = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-white">
     

      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-10 md:py-14">
        <div className="w-full max-w-[1100px] mb-10 md:mb-14">
          <div className="[transform:scaleX(-1)]">
          <Slider
            duration={35}         
            pauseOnHover={false}
            blurBorders={false}
          >
            {BRANDS.map((b) => (
              <Slider.Slide key={`top-${b.id}`}>
                <img
                  src={b.src}
                  alt={b.alt}
                  className="h-[28px] md:h-[36px] object-contain opacity-90 [transform:scaleX(-1)]"
                  draggable={false}
                />
              </Slider.Slide>
            ))}
          </Slider>
          </div>
        </div>

        {/* Center content */}
        <div className="w-full max-w-[700px] text-center flex flex-col items-center">
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] text-black">
            You're ready to generate your virtual try-on! ✨
          </h2>

          <p className="mt-4 text-[16px] md:text-[20px] font-normal leading-[1.2] text-black">
            Choose a brand, once you're on their website, right-click an item to
            generate your virtual try-on with fAIshion.AI
          </p>

          <button
            type="button"
            className="
              mt-8
              inline-flex items-center justify-center gap-3
              rounded-[27px]
              border-[3px] border-[#D4D4D4]
              bg-white
              px-6 md:px-8 py-3
              text-[18px] md:text-[20px]
              font-bold text-black
              shadow-sm hover:shadow-md transition
            "
          >
            {/* Google icon placeholder */}
            <span className="inline-flex h-6 w-6 items-center justify-center">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt=""
                className="h-5 w-5 object-contain"
                draggable={false}
              />
            </span>
            Search your favorite brands
          </button>
        </div>

        {/* BOTTOM infinite carousel (reverse direction) */}
        <div className="w-full max-w-[1100px] mt-12 md:mt-16">
          <Slider
            duration={35}
            pauseOnHover={false}
            blurBorders={false}
          >
            {BRANDS.map((b) => (
              <Slider.Slide key={`bottom-${b.id}`}>
                <img
                  src={b.src}
                  alt={b.alt}
                  className="h-[28px] md:h-[36px] object-contain opacity-90"
                  draggable={false}
                />
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </main>
    </div>
  );
};
