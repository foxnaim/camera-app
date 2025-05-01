// src/components/ImageInput.tsx

import React, { useState } from "react";

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Функция для обработки выбора файла
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Кнопка для открытия галереи */}
      <button
        onClick={() => document.getElementById("file-input")?.click()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Выбрать изображение
      </button>

      {/* Скрытый инпут для выбора файла */}
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

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
