// src/features/auth/onboarding/steps/ChooseViewerStep.tsx
import React from "react";

interface ChooseViewerStepProps {
  onSelectOwnPhoto: () => void;
  onSelectSampleModel: () => void;
}


export const ChooseViewerStep: React.FC<ChooseViewerStepProps> = ({
  onSelectOwnPhoto,
  onSelectSampleModel,
}) => {
  const handleOwn = () => {
    onSelectOwnPhoto();
  };

  const handleSample = () => {
    onSelectSampleModel();
  };

  return (
    <div className="flex flex-col items-center px-4 text-center">
      {/* Title: Inter, 34px / 51px, bold, centered */}
      <h2 className="text-[24px] md:text-[34px] leading-[32px] md:leading-[51px] font-bold text-[#000000]">
        Who do you want to see it on?
      </h2>

      {/* Subtitle: Inter, 20px / 30px, medium, #6B7280, centered, width 555px */}
      <p className="mt-2 max-w-[555px] text-[16px] md:text-[20px] leading-[24px] md:leading-[30px] font-medium text-[#6B7280] mx-auto">
        See how styles look on you or explore outfits with a model
      </p>

      {/* Cards container: width 1078px, height ~413px, gap 50px on desktop */}
      <div
        className="
          mt-10
          flex w-full max-w-[1078px]
          flex-col items-stretch gap-6
          md:flex-row md:items-stretch md:gap-[50px]
        "
      >
        {/* Card 1: Use your own photo (388 x 413) */}
        <button
          type="button"
          onClick={handleOwn}
          className="
            flex-1 max-w-[388px] mx-auto
            h-[320px] md:h-[413px]
            rounded-[24px] border-[4px] border-[#E0E0E0] bg-white
            shadow-sm
            transition-all duration-200
            flex flex-col items-center justify-center
            px-6 md:px-8
          "
        >
          {/* Icon circle */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex w-[100px] h-[100px] items-center justify-center rounded-full bg-[#EEEAFE]">
              {/* Replace with your real icon */}
              <span className="text-3xl text-[#6A5ACD]">🖼️</span>
            </div>
          </div>

          <h3 className="text-[24px] leading-[48.13px] font-bold text-[#000000] text-center">
            Use Your Own Photo
          </h3>
          <p className="mt-2 text-[14px] leading-[24px] font-normal text-[#000000] text-center">
            Upload a full-body photo for the most accurate try-on experience.
          </p>

          <p className="mt-4 text-[18px] leading-[24px] font-bold text-[#6A5ACD] text-center">
            → Most accurate fit and look
          </p>
        </button>

        {/* Card 2: Use a sample model (388 x 413) */}
        <button
          type="button"
          onClick={handleSample}
          className="
            flex-1 max-w-[388px] mx-auto
            h-[320px] md:h-[413px]
            rounded-[24px] border-[4px] border-[#E0E0E0] bg-white
            shadow-sm
            transition-all duration-200
            flex flex-col items-center justify-center
            px-6 md:px-8
          "
        >
          {/* Icon circle */}
          <div className="mb-6 flex items-center justify-center">
            <div className="flex w-[100px] h-[100px] items-center justify-center rounded-full bg-[#EEEAFE]">
              {/* Replace with your real icon */}
              <span className="text-3xl text-[#6A5ACD]">👥</span>
            </div>
          </div>

          <h3 className="text-[24px] leading-[48.13px] font-bold text-[#000000] text-center">
            Use a Sample Model
          </h3>
          <p className="mt-2 text-[14px] leading-[24px] font-normal text-[#000000] text-center">
            Don’t have a photo ready? Start faster by trying outfits on a model
            similar to you.
          </p>

          <p className="mt-4 text-[18px] leading-[24px] font-bold text-[#6A5ACD] text-center">
            → Quick &amp; no photo needed
          </p>
        </button>
      </div>
    </div>
  );
};
