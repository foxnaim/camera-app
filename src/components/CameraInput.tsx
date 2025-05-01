import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Функция для выбора изображения только из галереи
  const pickImageFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90, // Качество изображения
        source: CameraSource.Photos, // Выбор только из галереи (не камера)
        resultType: CameraResultType.DataUrl, // Получаем изображение в виде Data URL
      });
      setSelectedImage(image.webPath ?? null); // Устанавливаем выбранное изображение
    } catch (error) {
      console.error("Ошибка при выборе изображения", error);
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
      <button
        onClick={pickImageFromGallery}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Выбрать изображение из галереи v5
      </button>

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
