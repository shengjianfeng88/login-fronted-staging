import React from "react";
import Slider from "react-infinite-logo-slider";
import nike from "@/assets/onboarding/Nike-Logo.png";
import fendi from "@/assets/onboarding/Fendi-Logo.png";
import tommy from "@/assets/onboarding/Tommy-Logo.png";
import burberry from "@/assets/onboarding/Burberry-Logo.jpg";
import zara from "@/assets/onboarding/Zara-Logo.png";
import uniqlo from "@/assets/onboarding/Uniqlo-Logo.png";
import ralph from "@/assets/onboarding/Ralph-Logo.png";
import chanel from "@/assets/onboarding/Chanel-Logo.png";
import levis from "@/assets/onboarding/Levis-Logo.png";
import gap from "@/assets/onboarding/Gap-Logo.png";
import googleicon from "@/assets/onboarding/Google-Icon.png"

interface DoneStepProps {
  onBack: () => void; 
}

const handleSearchBrands = () => {
  window.open("https://www.google.com/", "_blank");
};

const BRANDS = [
  { id: "nike", src: nike, alt: "Nike", url: "https://www.nike.com" },
  { id: "fendi", src: fendi, alt: "Fendi", url: "https://www.fendi.com" },
  { id: "tommy", src: tommy, alt: "Tommy Hilfiger", url: "https://usa.tommy.com" },
  { id: "burberry", src: burberry, alt: "Burberry", url: "https://www.burberry.com" },
  { id: "zara", src: zara, alt: "Zara", url: "https://www.zara.com" },
  { id: "uniqlo", src: uniqlo, alt: "Uniqlo", url: "https://www.uniqlo.com" },
  { id: "ralph", src: ralph, alt: "Ralph Lauren", url: "https://www.ralphlauren.com" },
  { id: "chanel", src: chanel, alt: "Chanel", url: "https://www.chanel.com" },
  { id: "levis", src: levis, alt: "Levi's", url: "https://www.levi.com" },
  { id: "gap", src: gap, alt: "GAP", url: "https://www.gap.com" },
];

export const DoneStep: React.FC<DoneStepProps> = () => {
  return (
    <div className="flex flex-col min-h-[calc(90vh-80px)] bg-white">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-[1280px] mx-auto mb-4 md:mb-8">
  <div className="h-[99px] flex items-center overflow-hidden">
    <div className="[transform:scaleX(-1)] w-full">
      <Slider duration={35} pauseOnHover={false} blurBorders={false}>
        {BRANDS.map((b) => (
          <Slider.Slide key={`top-${b.id}`}>
            <div className="px-[29px] h-[99px] flex items-center">
              <button
                      type="button"
                      onClick={() => window.open(b.url, "_blank")}
                      className="px-[29px] h-[99px] flex items-center focus:outline-none"
                      aria-label={b.alt}
                    >
              <img
                src={b.src}
                alt={b.alt}
                className="
                  h-[42px] sm:h-[50px] md:h-[58px] lg:h-[64px]
                  object-contain opacity-90
                  [transform:scaleX(-1)]
                "
                draggable={false}
              />
              </button>
            </div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  </div>
</div>



        {/* Center content */}
        <div className="w-full max-w-[700px] text-center flex flex-col items-center">
          <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] text-black">
            You're ready to generate your virtual try-on! ✨
          </h2>

          <p className="mt-4 text-[12px] md:text-[16px] font-normal leading-[1.2] text-black">
            Choose a brand, once you're on their website, right-click an item to
            generate your virtual try-on with fAIshion.AI
          </p>

          <button
            onClick={handleSearchBrands}
            type="button"
            className="
              mt-4
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
            <span className="inline-flex h-6 w-6 items-center justify-center">
              <img
                src={googleicon}
                alt="Google"
                className="h-5 w-5 object-contain"
                draggable={false}
              />
            </span>
            Search your favorite brands
          </button>
        </div>

       <div className="w-full max-w-[1280px] mx-auto mt-4 md:mt-8">
  <div className="h-[99px] flex items-center overflow-hidden">
    <Slider duration={35} pauseOnHover={false} blurBorders={false}>
      {BRANDS.map((b) => (
        <Slider.Slide key={`bottom-${b.id}`}>
          <div className="px-[29px] h-[99px] flex items-center">
          <button
                      type="button"
                      onClick={() => window.open(b.url, "_blank")}
                      className="px-[29px] h-[99px] flex items-center focus:outline-none"
                      aria-label={b.alt}
                    >
            <img
              src={b.src}
              alt={b.alt}
              className="
                h-[42px] sm:h-[50px] md:h-[58px] lg:h-[64px]
                object-contain opacity-90
              "
              draggable={false}
            />
            </button>
          </div>
        </Slider.Slide>
      ))}
    </Slider>
  </div>
</div>


      </main>
    </div>
  );
};
