import React, { useState, useEffect } from "react";
import "../assets/styles/Anbf.scss";
import PopupCard from "../components/PopupCard";
import Normal from "../assets/images/8.jpg";
import Romantic from "../assets/images/16.jpg";


export default function AnniversaryGift() {
  const [clickHeart, setClickHeart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hover, setHover] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Generate floating hearts in background
  useEffect(() => {
    const generateFloatingHearts = () => {
      const hearts = Array.from({ length: 15 }).map(() => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.5
      }));
      setFloatingHearts(hearts);
    };

    generateFloatingHearts();
  }, []);

  const handleClick = () => {
    setClickHeart(true);

    // Generate 8 sparkles randomly around heart
    const newSparkles = Array.from({ length: 8 }).map(() => ({
      id: Date.now() + Math.random(),
      randX: Math.random(),
      randY: Math.random()
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setClickHeart(false);
      setSparkles([]);
      setShowPopup(true);
    }, 1500);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="anniversary-container">
      {/* Floating background hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
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

      <div className="image-wrapper">
        {/* Use absolute paths from public folder or import images */}
        <img src={Normal} alt="Normal" className="circle-image normal" />
        <img src={Romantic} alt="Romantic" className="circle-image romantic" />
      </div>

      <button
        className="love-button"
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        I ❤ You
        {hover && (
          <>
            <span className="hover-heart" style={{ left: "-20px", top: "0" }}>❤</span>
            <span className="hover-heart" style={{ left: "0px", top: "-10px" }}>❤</span>
            <span className="hover-heart" style={{ left: "20px", top: "0" }}>❤</span>
          </>
        )}
      </button>

      {clickHeart && (
        <img
          src="/images/red.webp"
          alt="3D Heart"
          className="center-heart"
        />
      )}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{ 
            '--randX': s.randX, 
            '--randY': s.randY,
            left: `${s.randX * 100}%`,
            top: `${s.randY * 100}%`
          }}
        >
          ✨
        </span>
      ))}
      
      {showPopup && <PopupCard showPopup={showPopup} onClose={handlePopupClose} />}
    </div>
  );
}