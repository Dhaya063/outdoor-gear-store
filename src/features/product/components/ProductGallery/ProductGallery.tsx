import { useState } from "react";

import styles from "./ProductGallery.module.scss";

interface Props {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images,
  title,
}: Props) {
  const [activeImage, setActiveImage] =
    useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img
          src={activeImage}
          alt={title}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnailRow}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnailButton} ${
              activeImage === image
                ? styles.active
                : ""
            }`}
            onClick={() =>
              setActiveImage(image)
            }
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className={styles.thumbnail}
            />
          </button>
        ))}
      </div>
    </div>
  );
}