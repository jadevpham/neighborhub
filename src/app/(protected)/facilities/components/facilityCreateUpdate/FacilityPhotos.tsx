import { FacilityImage, FacilityPhotosProps } from "@/types/facility";
export default function FacilityPhotos({ images, onChange }: FacilityPhotosProps) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []) as File[];
    
        const updated: FacilityImage[] = [...images, ...files];
        onChange(updated);
      };
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Photos</h3>
  
        <div className="flex gap-3">
          {images.map((img: any, idx: number) => (
            <div key={idx} className="w-28 h-28 rounded-xl overflow-hidden bg-gray-200">
              <img src={typeof img === "string" ? img : URL.createObjectURL(img)} className="w-full h-full object-cover" />
            </div>
          ))}
  
          <label className="w-28 h-28 border rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-50">
            <span className="text-2xl">＋</span>
            <input type="file" multiple hidden onChange={handleUpload} />
          </label>
        </div>
      </div>
    );
  }
  