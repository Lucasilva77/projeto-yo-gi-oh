import { useState, useEffect } from "react";
import "./Banner.css";

export default function Banner({
  images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"],
  intervalMs = 8000,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="banner-carousel">
      <div
        className="banner-slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="banner-slide" key={i}>
            <img src={src} alt={`Banner ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Bolinhas */}
      <div className="banner-indicators">
        {images.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
