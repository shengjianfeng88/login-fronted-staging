import React, { useCallback, useRef, useState } from "react";
import uploadVideo from "@/assets/onboarding/Upload-Image-Tutorial.mp4";
import checkcircle from "@/assets/onboarding/Check circle.png"
import uploadimage from "@/assets/onboarding/Upload-Sign.png"

interface UploadPhotoStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

const PHOTO_REQUIREMENTS = [
  "Just You",
  "Tight-fitting Clothes",
  "Full Body",
  "Max Size 10MB",
];

export const UploadPhotoStep: React.FC<UploadPhotoStepProps> = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || !files.length) return;
    const file = files[0];
    setFileName(file.name);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Top bar */}
      <div className="w-full px-4 md:px-12 lg:px-20 pt-0">
        <h1
          className="
            text-center font-bold text-black
            text-[24px] md:text-[32px]
            leading-[1.0]
          "
        >
          Upload Your Photo
        </h1>
      </div>

      {/* Main content */}
      <div className="w-full px-4 md:px-12 lg:px-20 pb-12 pt-8">
        <div
          className="
            w-full max-w-[1116px] mx-auto
            flex flex-col md:flex-row
            items-start md:items-stretch
            gap-8 lg:gap-[70px]
          "
        >
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <div
              className="
                w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px]
                h-[260px] sm:h-[360px] md:h-[460px] lg:h-[546px]
                rounded-[24px] overflow-hidden
                border-[4px] border-[#6A5ACD]
              "
            >
              <video
                src={uploadVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 w-full flex flex-col">
            <div className="max-w-[746px] w-full mb-4 md:mb-6">
              <h2
                className="
                  font-bold text-black
                  text-[20px] md:text-[24px]
                  leading-[1.0]
                  mb-4 md:mb-4
                "
              >
                Photo requirements
              </h2>

              <div
                className="
                  flex flex-wrap items-center
                  gap-x-[15px] gap-y-2
                  text-[14px] md:text-[16px]
                  font-medium
                  text-[#1E1E1E]
                  leading-[1.0]
                "
              >
                {PHOTO_REQUIREMENTS.map((req) => (
                  <div key={req} className="inline-flex items-center gap-2">
                     <img
    src={checkcircle}
    alt="check"
    className="w-[19px] h-[19px] object-contain"
    draggable={false}
  />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex-1 flex items-start md:items-center">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  w-full max-w-[746px]
                  h-[260px] sm:h-[360px] md:h-[440px] lg:h-[440px]
                  rounded-[46px]
                  flex flex-col items-center justify-center
                  px-6 sm:px-10 lg:px-14
                  py-6 sm:py-10 lg:py-14
                  transition-colors
                  ${isDragging ? "bg-[#EFE6FF]" : "bg-[#F7F7F7]"}
                `}
                style={{
                  border: `3px dashed ${isDragging ? "#6A5ACD" : "#DADADA"}`,
                  borderRadius: "46px",
                }}
              >
                {/* Upload icon circle */}
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EFE6FF]">
                    <img src={uploadimage} alt="Upload Image"/>
                  </div>
                </div>

                <p className="text-[18px] md:text-[20px] font-bold text-black leading-[24px] mb-1 text-center">
                  Drag and drop
                </p>
                <p className="text-[14px] md:text-[16px] font-medium text-black leading-[24px] mb-4 text-center">
                  or browse for photos
                </p>

                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="
                    inline-flex items-center justify-center
                    rounded-[16px] bg-[#6A5ACD]
                    px-6 py-1.5 text-[15px] font-bold text-white
                  "
                  style={{ minWidth: "105px", minHeight: "29px" }}
                >
                  Browse
                </button>

                {fileName && (
                  <p className="mt-3 text-xs text-gray-500 text-center">
                    Selected: {fileName}
                  </p>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
