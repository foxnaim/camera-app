import { useState } from "react";
import { Media } from "@capacitor-community/media";
import { Capacitor } from "@capacitor/core";

console.log("Capacitor version:", Capacitor.getPlatform());
console.log("Media plugin available:", !!Media.pickImages);

declare module "@capacitor-community/media" {
  export interface MediaPlugin {
    pickImages(options: {
      limit: number;
    }): Promise<{ photos: { path: string }[] }>;
  }
}

const ImageInput = () => {
  const [selectedImage, _setSelectedImage] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    try {
      const result = await Media.pickImages({ limit: 1 });

      if (result && result.photos.length > 0) {
        const photo = result.photos[0];
        console.log("Selected photo path:", photo.path);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Кнопка для открытия галереи */}
      <button onClick={pickImageFromGallery}>Загрузить из галереи v7</button>

      {/* Если изображение выбрано, показываем его */}
      {selectedImage && (
        <div style={{ marginTop: "20px" }}>
          <h2>Выбранное изображение</h2>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
