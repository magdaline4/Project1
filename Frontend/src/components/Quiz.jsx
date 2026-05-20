// LoveQuiz.jsx
import React, { useState } from "react";
import "../assets/styles/Quiz.scss";

export default function LoveQuiz() {
  const questions = [
    { q: "What is my favorite color?", a: "purple" },
    { q: "What is my favorite Pet Animal?", a: "dog" },
    { q: "What city do I want to visit with you?", a: "maldives" },
    { q: "What makes me happiest?", a: "traveling" },
    { q: "What is my dream with you?", a: "marriage" }
  ];

  const loveMessages = [
    "I miss you 💕",
    "You are my everything ❤️",
    "Forever together 🌹",
    "My heart beats for you 💓",
    "Love you endlessly 💍"
  ];

  const cardColors = [
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "linear-gradient(135deg, #ffdde1, #ee9ca7)",
    "linear-gradient(135deg, #84fab0, #8fd3f4)",
    "linear-gradient(135deg, #ffecd2, #fcb69f)"
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [completed, setCompleted] = useState(false);

  const [showCard, setShowCard] = useState(false);
  const [message, setMessage] = useState("");
  const [cardColor, setCardColor] = useState("");

  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === questions[current].a) {
      // Show love message card
      const msg = loveMessages[current % loveMessages.length];
      const color = cardColors[current % cardColors.length];
      setMessage(msg);
      setCardColor(color);
      setShowCard(true);

      // Flip card for 4s then continue
      setTimeout(() => {
        setShowCard(false);
        if (current < questions.length - 1) {
          setCurrent(current + 1);
          setAnswer("");
        } else {
          setCompleted(true);
        }
      }, 4000);
    } else {
      alert("Oops, wrong answer! Try again ❤️");
    }
  };

  const handleFinalUnlock = () => {
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
      setShowVideo(true);
    }, 4000);
  };

  return (
    <div className="love-quiz-container">
      <button className="open-quiz-btn" onClick={() => setShowQuiz(true)}>
        Open Surprise ❤️
      </button>

      {showQuiz && (
        <div className="quiz-popup">
          {/* Show card flip when answer is correct */}
          {showCard ? (
            <div className="flip-card show">
              <div className="flip-inner">
                <div className="flip-front">💖</div>
                <div
                  className="flip-back"
                  style={{ background: cardColor }}
                >
                  {message}
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-card">
              {!showImage && !showVideo && (
                <>
                  {!completed ? (
                    <>
                      <h2>{questions[current].q}</h2>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer..."
                      />
                      <button onClick={handleSubmit}>Submit</button>
                    </>
                  ) : (
                    <>
                      <h2>All answers are correct! 🎉</h2>
                      <button className="unlock-btn" onClick={handleFinalUnlock}>
                        Unlock Surprise 💝
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {/* Final Surprise */}
          {showImage && (
            <div className="surprise-fullscreen">
              {/* FIXED: Direct path to public folder */}
              <img src="/images/1.jpg" alt="Surprise" />
            </div>
          )}

          {showVideo && (
            <div className="surprise-fullscreen">
              {/* FIXED: Direct path to public folder */}
              <video autoPlay controls>
                <source src="/images/My-World.mp4" type="video/mp4" />
                Your browser does not support video tag.
              </video>
            </div>
          )}
        </div>
      )}
    </div>
  );
}