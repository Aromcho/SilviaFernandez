import React, { useEffect, useRef } from "react";
import "./PozoCarousel3D.css";

const images = [
  "/pozo/pozo.jpeg",
  "/pozo/pozo (1).jpeg",
  "/pozo/pozo (2).jpeg",
  "/pozo/pozo (3).jpeg",
  "/pozo/pozo (4).jpeg",
  "/pozo/pozo (5).jpeg",
  "/pozo/pozo (6).jpeg",
];

const PozoCarousel3D = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    const totalImages = images.length;
    const interval = setInterval(() => {
      angle += 360 / totalImages;
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${angle}deg)`;
      }
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {images.map((img, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              transform: `rotateY(${index * (360 / images.length)}deg) translateZ(450px)`, // Se ajusta la profundidad
            }}
          >
            <img src={img} alt={`Pozo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PozoCarousel3D;
