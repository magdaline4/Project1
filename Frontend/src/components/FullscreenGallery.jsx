import React, { useState, useEffect } from "react";
import "../assets/styles/FullscreenGallery.scss";
import Quiz from "../components/Quiz";

const MOBILE_QUERY = "(max-width: 768px)";
const SLIDE_INTERVAL = 1700; // ms between photos on phone — raise to 3000 for 3s

export default function FullscreenGallery() {
  const [activeIndex, setActiveIndex] = useState(null); // fullscreen overlay
  const [slideIndex, setSlideIndex] = useState(0);      // phone slideshow
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );
  const [floatingHeart, setFloatingHeart] = useState([]);

  const photos = Array.from({ length: 20 }, (_, i) => `/images/${i + 1}.jpg`);

  // Switch between phone slideshow and desktop grid
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => {
      setIsMobile(e.matches);
      setActiveIndex(null); // close overlay when the layout flips
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Phone only: one photo at a time, advance every SLIDE_INTERVAL
  useEffect(() => {
    if (!isMobile || activeIndex !== null) return; // pause while fullscreen is open
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % photos.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isMobile, activeIndex, photos.length]);

  // Floating background hearts
  useEffect(() => {
    setFloatingHeart(
      Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.5,
      }))
    );
  }, []);

  const handlePhotoClick = (index) => setActiveIndex(index);
  const handleCloseFullscreen = () => setActiveIndex(null);

  return (
    <div className={`photo-gallery${isMobile ? " is-mobile" : ""}`}>
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
            opacity: heart.opacity,
          }}
        >
          ❤
        </div>
      ))}

      {isMobile ? (
        /* Phone: single auto-advancing photo */
        <div className="photo-slider">
          <div
            key={slideIndex} /* remount -> re-runs the slide animation */
            className="photo-wrapper slide"
            onClick={() => handlePhotoClick(slideIndex)}
          >
            <img
              src={photos[slideIndex]}
              alt={`Gallery ${slideIndex}`}
              className="photo"
            />
          </div>
        </div>
      ) : (
        /* Desktop: normal grid */
        photos.map((photo, index) => (
          <div
            key={index}
            className={`photo-wrapper ${activeIndex === index ? "active" : ""}`}
            onClick={() => handlePhotoClick(index)}
          >
            <img src={photo} alt={`Gallery ${index}`} className="photo" />
          </div>
        ))
      )}

      {/* Fullscreen overlay */}
      {activeIndex !== null && (
        <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
          <div className="fullscreen-content">
            <img
              src={photos[activeIndex]}
              alt={`Gallery ${activeIndex}`}
              className="fullscreen-photo"
            />
            <button className="close-button" onClick={handleCloseFullscreen}>
              ×
            </button>
          </div>
        </div>
      )}

      <Quiz />
    </div>
  );
}