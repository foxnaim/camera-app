import { useState } from "react";
import { Media } from "@capacitor-community/media";

declare module "@capacitor-community/media" {
  export interface MediaPlugin {
    pickImages(options: {
      limit: number;
    }): Promise<{ photos: { path: string }[] }>;
  }
}

const ImageInput = () => {
  const [selectedImage, _setSelectedImage] = useState<string | null>(null);

  // Функция для выбора изображения только из галереи
  const pickImageFromGallery = async () => {
    try {
      const result = await Media.pickImages({ limit: 1 });

      if (result && result.photos.length > 0) {
        const photo = result.photos[0];
        console.log("Selected photo path:", photo.path); // Используй для отображения
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
    }
  };

  //   const openGallery = async () => {
  //     try {
  //       const image = await Camera.getPhoto({
  //         quality: 90,
  //         source: CameraSource.Photos, // Источник - галерея
  //         resultType: CameraResultType.Uri, // Возвращаем URI изображения
  //       });

  //       // Здесь можно обработать полученное изображение
  //       console.log(image);
  //     } catch (error) {
  //       console.error("Ошибка при открытии галереи:", error);
  //     }
  //   };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Кнопка для открытия галереи */}
      <button onClick={pickImageFromGallery}>Загрузить из галереи v6</button>

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
