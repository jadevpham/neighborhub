"use client";

import { FacilityImage, FacilityPhotosProps } from "@/types/facility";
import { X } from "lucide-react";

export default function FacilityPhotos({ images, onChange }: FacilityPhotosProps) {
  // Upload ảnh (chỉ 1 file)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0]; // chỉ lấy file đầu tiên

    // Chỉ giữ 1 ảnh
    onChange([file]);
  };

  // Xóa ảnh
  const handleRemove = () => {
    onChange([]); // xoá ảnh → danh sách rỗng
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Photo</h3>

      <div className="flex gap-3 flex-wrap">
        {/* HIỂN THỊ ẢNH NẾU CÓ */}
        {images.length > 0 && (
          <div className="relative group w-32 h-32 rounded-xl overflow-hidden bg-gray-200">
            <img
              src={
                typeof images[0] === "string"
                  ? images[0]
                  : URL.createObjectURL(images[0])
              }
              className="w-full h-full object-cover"
            />

            {/* NÚT XOÁ */}
            <button
              onClick={handleRemove}
              className="
                absolute top-1 right-1 w-7 h-7
                bg-black/60 text-white rounded-full
                opacity-0 group-hover:opacity-100
                flex items-center justify-center transition
              "
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* CHỈ HIỆN UPLOAD KHI CHƯA CÓ ẢNH */}
        {images.length === 0 && (
          <label className="w-32 h-32 border rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <span className="text-2xl">＋</span>
            <input type="file" hidden accept="image/*" onChange={handleUpload} />
          </label>
        )}
      </div>
    </div>
  );
}
