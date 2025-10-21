import React, { useState, useEffect } from "react";
import "../assets/styles/FullscreenGallery.scss";
import Quiz from "../components/Quiz";

export default function FullscreenGallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [floatingHeart, setFloatingHeart] = useState([]);
  
  const [hearts, setHearts] = useState([]); // for romantic button
  const photos = Array.from({ length: 20 }, (_, i) => `/images/${i + 1}.jpg`);


  // Generate hearts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100, // horizontal position %
        size: 10 + Math.random() * 20, // size px
        duration: 4 + Math.random() * 3 // float duration in seconds
      };
      setHearts((prev) => [...prev, newHeart]);
      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 500); // generate a new heart every 0.5s

    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = (index) => {
    setActiveIndex(index);
  };

  const handleCloseFullscreen = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    const generateFloatingHearts = () => {
      const hearts = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.5
      }));
      setFloatingHeart(hearts);
    };

    generateFloatingHearts();
  }, []);

  return (
    <div className="photo-gallery">
      {/* Floating background hearts */}
      {floatingHeart.map((heart) => (
        <div
          key={heart.id}
          className="floating-hearts"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity
          }}
        >
          ❤
        </div>
      ))}
      
      {/* Photo grid */}
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`photo-wrapper ${activeIndex === index ? "active" : ""}`}
          onClick={() => handlePhotoClick(index)}
        >
          <img src={photo} alt={`Gallery ${index}`} className="photo" />
        </div>
      ))}
      
      {/* Fullscreen overlay when photo is clicked */}
      {activeIndex !== null && (
      <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
  <div className="fullscreen-content">
    <img src={photos[activeIndex]} className="fullscreen-photo" />
    <button className="close-button" onClick={handleCloseFullscreen}>×</button>
  </div>
</div>

      )}
      
      <Quiz />
    </div>
  );
}