import React, { useEffect, useRef, useState } from "react";
import pinToolbarVideo from "@/assets/onboarding/PinToolbarStep.mp4";

interface PinToolbarStepProps {
  onNext: () => void;
}



export const PinToolbarStep: React.FC<PinToolbarStepProps> = ({ onNext }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // required for autoplay
    video.play().catch(() => console.log("Autoplay blocked"));

    const updateProgress = () => {
      if (!video.duration) return;
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const newTime =
      (clickX / width) * (videoRef.current.duration || 0);

    videoRef.current.currentTime = newTime;
  };

  return (
    <div
      className="
        mt-4 md:mt-6
        flex flex-col items-center
        gap-8 md:gap-10
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* LEFT: text content */}
      <div className="w-full md:w-[390px] min-h-[208px]">
        <h2 className="text-[26px] md:text-[32px] leading-[32px] md:leading-[39px] font-bold text-[#1E1E1E]">
          Pin fAIshion.AI to your toolbar📌
        </h2>

        <p className="mt-3 text-[18px] leading-[26px] font-medium text-[#6B6B6B]">
          Keep it one click away while you shop
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex rounded-[10px] bg-[#2F2F2F] px-6 py-2 text-sm font-semibold text-white"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT: responsive video with fixed aspect ratio */}
      <div className="flex w-full md:flex-1 items-center justify-center">
        <div className="w-full max-w-[706px] relative">

          {/* VIDEO WITH ASPECT RATIO */}
          <div className="aspect-[706/507] w-full relative rounded-[42px] overflow-hidden">
            <video
              ref={videoRef}
              src={pinToolbarVideo}
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* OVERLAY PROGRESS BAR */}
            <div
              className="absolute bottom-0 left-0 w-full h-2 bg-black/30 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-red-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
