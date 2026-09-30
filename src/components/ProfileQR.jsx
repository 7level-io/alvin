import React, { useState } from "react"
import ProfileQRCode from "../assets/images/Alvin QR.png"

const ProfileQR = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation()
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://7level.in")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="qr-code-container">
      <div className="qr-header-row">
        <div className="qr-title-box">
          <i className="fa fa-qrcode"></i>
          <span>QR Code</span>
        </div>
        <button
          onClick={handleCopy}
          className="qr-copy-btn"
          type="button"
          aria-label="Copy link"
        >
          <i className={`fa ${copied ? "fa-check" : "fa-copy"}`}></i>
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </button>
      </div>

      <div className="qr-image-wrapper">
        <img src={ProfileQRCode} alt="Alvin Contact QR Code" className="qr-code" />
      </div>
    </div>
  )
}

export default ProfileQR
