import { useEffect, useState } from "react";
import { Media } from "@capacitor-community/media";
import { Capacitor } from "@capacitor/core";

declare module "@capacitor-community/media" {
  export interface MediaPlugin {
    pickImages(options: {
      limit: number;
    }): Promise<{ photos: { path: string }[] }>;
  }
}

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string>("Unknown");
  const [mediaAvailable, setMediaAvailable] = useState<boolean>(false);
  const [isNative, setIsNative] = useState<boolean>(false);

  useEffect(() => {
    const currentPlatform = Capacitor.getPlatform();
    setPlatform(currentPlatform);

    const available =
      currentPlatform !== "web" && typeof Media.pickImages === "function";
    setMediaAvailable(available);

    const native = Capacitor.isNativePlatform();
    setIsNative(native);
  }, []);

  const pickImageFromGallery = async () => {
    try {
      const result = await Media.pickImages({ limit: 1 });

      if (result && result.photos.length > 0) {
        const photo = result.photos[0];
        setSelectedImage(photo.path);
        console.log("Selected photo path:", photo.path);
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Платформа:</strong> {platform}
        </p>
        <p>
          <strong>Media Plugin доступен:</strong>{" "}
          {mediaAvailable ? "Да" : "Нет"}
        </p>
        <p>
          <strong>isNativePlatform():</strong>{" "}
          {isNative ? "Да (native)" : "Нет (web)"}
        </p>
      </div>

      <button onClick={pickImageFromGallery}>Загрузить из галереи</button>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>v9 | 04.05 | logs</p>
      </div>

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
