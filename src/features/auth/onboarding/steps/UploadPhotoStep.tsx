import React, { useCallback, useRef, useState } from "react";
import uploadVideo from "@/assets/onboarding/19700121_0145_6916f2cc71d08191a4c746c00d27fb1b.mp4";

interface UploadPhotoStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const UploadPhotoStep: React.FC<UploadPhotoStepProps> = ({
  onBack,
  onNext,
}) => {
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
    // TODO: hook this into your actual upload / pipeline
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
    <div className="flex flex-col w-full h-full">
      {/* Top bar with back + next */}
      <div className="flex items-center justify-between w-full px-4 md:px-8 pt-4">
        {/* Back icon – rotated to match design */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10"
        >
          <span
            className=" block
      w-[20px] h-[20px]
      border-l-[3.5px] border-b-[3.5px]
      border-[#767676]
      rotate-[45deg]
    "
          />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-[#2F2F2F] px-4 py-1.5 text-[13px] font-semibold text-white"
        >
          Next
          <span className="text-xs">➜</span>
        </button>
      </div>

      {/* Main content */}
            {/* Main content */}
      <div className="w-full px-4 md:px-12 lg:px-20 pb-12 pt-6">
        <h1 className="text-[24px] md:text-[32px] font-bold text-[#000000] mb-6">
          Upload Your Photo
        </h1>

        {/* Sample photo + drag & drop row */}
        <div className="w-full flex justify-center">
          <div
            className="
              w-full max-w-[1116px]
              flex flex-col md:flex-row
              items-stretch
              gap-8 lg:gap-[70px]
            "
          >
            {/* Left: sample video */}
            <div className="w-full md:w-auto flex justify-center">
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

            {/* Right: drag & drop area */}
            <div className="flex-1 flex items-center">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="
                  w-full
                  h-[260px] sm:h-[360px] md:h-[460px] lg:h-[546px]
                  rounded-[46px]
                  bg-[#F7F7F7]
                  flex flex-col items-center justify-center
                  px-6 sm:px-10 lg:px-14
                  py-6 sm:py-10 lg:py-14
                "
                style={{ border: "3px dashed #DADADA", borderRadius: "46px" }}
              >
                {/* Upload icon circle */}
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EFE6FF]">
                    <span className="text-2xl text-[#6A5ACD]">⬆️</span>
                  </div>
                </div>

                {/* Drag and drop text */}
                <p className="text-[18px] md:text-[20px] font-bold text-[#000000] leading-[24px] mb-1 text-center">
                  Drag and drop
                </p>
                <p className="text-[14px] md:text-[16px] font-medium text-[#000000] leading-[24px] mb-4 text-center">
                  or browse for photos
                </p>

                {/* Browse button */}
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="inline-flex items-center justify-center rounded-[16px] bg-[#6A5ACD] px-6 py-1.5 text-[15px] font-bold text-white"
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
