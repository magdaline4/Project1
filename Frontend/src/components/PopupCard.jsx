import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/PopupCard.scss";
import Card from "../assets/images/1.jpg"

const PopupCard = ({ showPopup, onClose }) => {
  const [flipped, setFlipped] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [topHearts, setTopHearts] = useState([]);
  const [bottomHearts, setBottomHearts] = useState([]);
  const [hearts, setHearts] = useState([]); // for romantic button
  const navigate = useNavigate();

  useEffect(() => {
    // Create 2 hearts for top-left
    const newTop = Array.from({ length: 2 }).map((_, i) => ({
      id: Date.now() + i,
      left: 5 + i * 10,
    }));
    setTopHearts(newTop);

    // Create 2 hearts for bottom-right
    const newBottom = Array.from({ length: 2 }).map((_, i) => ({
      id: Date.now() + i + 100,
      left: 5 + i * 10,
    }));
    setBottomHearts(newBottom);
  }, []);

const handleRomanticButtonClick = () => {
  const newHearts = Array.from({ length: 5 }).map((_, i) => ({
    id: Date.now() + i,
    left: Math.random() * 80 + 10,          // horizontal position
    duration: 2 + Math.random() * 1.5,      // 2s to 3.5s
    drift: Math.random() * 20 - 10          // random X drift (-10px to +10px)
  }));
  setHearts(newHearts);

  setTimeout(() => {
    setHearts([]);
    navigate("/special-message");
  }, 2500); // match longest duration
};

  if (!showPopup) return null;

  const handleSmallCardClick = (e) => {
    e.stopPropagation();
    setShowQuestion(true);
  };

  const handleAnswer = (answer) => {
    if (answer) setFlipped(true);
    setShowQuestion(false);
  };

  const handleMainCardClick = () => {
    if (!showQuestion && !flipped) setFlipped(!flipped);
  };

  return (
    <div className="overlay">

      <div className="popup-card animate-popup">
        <button className="back-btn" onClick={onClose}>&times;</button>

        {/* Top-left hearts */}
        <div className="hearts top-left">
          {topHearts.map((heart) => (
            <span key={heart.id} className="floating-heart" style={{ left: `${heart.left}%` }}>❤️</span>
          ))}
        </div>

        {/* Bottom-right hearts */}
        <div className="hearts bottom-right">
          {bottomHearts.map((heart) => (
            <span key={heart.id} className="floating-heart" style={{ left: `${heart.left}%` }}>❤️</span>
          ))}
        </div>

        {/* Question Popup */}
        {showQuestion && (
          <div className="question-popup">
            <div className="question-content">
              <h3>Do you love me? 💕</h3>
              <div className="answer-buttons">
                <button className="yes-btn" onClick={() => handleAnswer(true)}>Yes! ❤️</button>
                <button className="no-btn" onClick={() => handleAnswer(false)}>No 😢</button>
              </div>
            </div>
          </div>
        )}

        {/* Flip Card */}
        <div className={`main-card ${flipped ? "flipped" : ""}`} onClick={handleMainCardClick}>
          <div className="front">
            <div className="front-content">
              <h2 className="lovable-words">You are amazing 💖</h2>
              <div className="small-card" onClick={handleSmallCardClick}>Click Me 💌</div>
            </div>
          </div>

          <div className="back">
            <div className="back-content">
              <img src={Card} alt="Cute" className="rounded-image" />
              <p className="lovable-words">You are lovable ❤️</p>
              <div className="romantic-button-container small">
                <button className="romantic-button small" onClick={handleRomanticButtonClick}>
                  Click Me Chella Kutty
                </button>
              {hearts.map((heart) => (
  <span
    key={heart.id}
    className="floating-heart"
    style={{
      left: `${heart.left}%`,
      animationDuration: `${heart.duration}s`,
      '--float-x': `${heart.drift}px`,
    }}
  >
    ❤️
  </span>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
