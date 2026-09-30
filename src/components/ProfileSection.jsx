import React from "react"
import ProfileImage from "../assets/images/alvixedoodle-crop.webp"

const ProfileSection = () => {
  return (
    <div className="profile-section">
      <div className="profile-image-container">
        <img src={ProfileImage} alt="Alvin Lalduhawma" className="profile-pic" />
      </div>
      <div className="profile-header-info">
        <h1 className="profile-name">Alvin Lalduhawma</h1>
        <p className="profile-headline">
          <span className="role-tag">Founder &amp; CEO</span>
          <span className="bullet-sep">•</span>
          <span className="org-tag">7level</span>
        </p>
      </div>
    </div>
  )
}

export default ProfileSection
