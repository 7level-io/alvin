import React from "react"
import ProfileQRCode from "../assets/images/Alvin QR.png"

const ProfileQR = () => {
  return (
    <div className="qr-code-container">
      <img src={ProfileQRCode} alt="QR CODe" className="qr-code" />
    </div>
  )
}

export default ProfileQR
