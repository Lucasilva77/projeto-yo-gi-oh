import { useState, useEffect } from "react";
import b1 from "../assets/banner1.jpg";
import b2 from "../assets/banner2.jpg";
import b3 from "../assets/banner3.jpg";


export default function Banner({
  images = [b1, b2, b3],
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

      {/* Bolinhas clicáveis */}
      <div className="banner-indicators">
        {images.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)} // 👈 clicou, troca o banner
          />
        ))}
      </div>
    </div>
  );
}
