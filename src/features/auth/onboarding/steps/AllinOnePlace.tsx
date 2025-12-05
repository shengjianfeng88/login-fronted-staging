import React, { useEffect, useRef, useState } from "react";
import chatbotVideo from "@/assets/onboarding/Try-on History.mp4";

interface AllinOnePlaceProps {
  onBack: () => void;
  onNext: () => void;
}

export const AllinOnePlaceProps: React.FC<AllinOnePlaceProps> = () => {
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
    <div className="flex flex-col w-full h-full">
     
     <section className="w-full flex flex-col items-center">
  <div className="w-full max-w-[710px] flex flex-col items-center text-center gap-[22px]">
    <h2 className="text-[40px] md:text-[48px] font-bold text-[#000000]">
      Try-On History
    </h2>
    <p className="text-[18px] font-normal text-[#000000] leading-[1.2]">
      Look back at every outfit you've tried and revisit your favorites anytime.
    </p>
  </div>

       
        <div className="mt-8 w-full flex justify-center">
    <div
      className="
          w-full
    max-w-[360px]      
    sm:max-w-[440px]   
    md:max-w-[560px]   
    lg:max-w-[680px]   
    xl:max-w-[760px]   
    aspect-[814/458]   
    rounded-[18px]
    border-[7px] border-[#6A5ACD]
    bg-white
    shadow-[0_4px_4px_rgba(0,0,0,0.25)]
    overflow-hidden relative
      "
    >
            <video
            ref={videoRef}
              src={chatbotVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
             <div
          className="absolute bottom-0 left-0 w-full h-2 bg-black/30 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-red-500" 
            style={{ width: `${progress}%` }}
          ></div></div>
          </div>
        </div>
      </section>
      </div>
  
  );
};
