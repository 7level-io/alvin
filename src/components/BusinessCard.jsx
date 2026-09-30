import React, { useState, useEffect } from "react"
import "../css/BusinessCard.css"
import LogoIcon from "../assets/images/7level v3.webp"
import QrCode from "../assets/images/Alvin QR.png"

const BusinessCard = ({ onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const toggleFullscreen = (e) => {
    e.stopPropagation()
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <div className="bc-card-stage-container">
      {/* Top Floating Controls */}
      <div className="bc-floating-bar">
        <button
          className="bc-ctrl-btn"
          onClick={onBack}
          type="button"
          aria-label="Back to Profile"
          title="Back"
        >
          <i className="fa fa-arrow-left"></i>
        </button>

        <button
          className="bc-ctrl-btn"
          onClick={toggleFullscreen}
          type="button"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          <i className={`fa ${isFullscreen ? "fa-compress" : "fa-expand"}`}></i>
        </button>
      </div>

      {/* Horizontal Landscape 3D Flippable Card (No 90deg rotation) */}
      <div
        className="bc-card-wrapper"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleFlip()
          }
        }}
        aria-label={`Business card (${isFlipped ? "Back" : "Front"}). Tap to flip.`}
      >
        <div className={`bc-card-inner ${isFlipped ? "flipped" : ""}`}>
          {/* FRONT FACE */}
          <div className="bc-card-face bc-card-front">
            <div className="bc-front-top">
              <div className="bc-front-accent" />
              <img src={LogoIcon} alt="7level" className="bc-front-logo" />
            </div>

            <div className="bc-front-mid">
              <div className="bc-front-name">Alvin Lalduhawma</div>
              <div className="bc-front-role">
                <span className="role-text">Founder &amp; CEO</span>
                <span className="dot">•</span>
                <span className="org-text">7level</span>
              </div>
            </div>

            <div className="bc-front-divider" />

            <div className="bc-front-bottom">
              <div className="bc-contact-item">
                <i className="fa fa-phone"></i>
                <span>+91 87877 89232</span>
              </div>
              <div className="bc-contact-item">
                <i className="fa fa-envelope"></i>
                <span>alvixe@7level.in</span>
              </div>
              <div className="bc-contact-item">
                <i className="fa fa-globe"></i>
                <span>7level.in</span>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="bc-card-face bc-card-back">
            <div className="bc-back-brand">
              <img src={LogoIcon} alt="7level" className="bc-back-logo" />
              <span className="bc-back-domain">7level.in</span>
            </div>

            <div className="bc-back-qr-box">
              <img src={QrCode} alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCard
