import React, { useState } from "react"
import "../css/Layout.css"
import "../css/BusinessCard.css"
import ReactGA from "react-ga4"
import TopIcon from "./TopIcon"
import ProfileSection from "./ProfileSection"
import AddContact from "./AddContact"
import MeetingScheduler from "./MeetingScheduler"
import AdditionalInfo from "./AdditionalInfo"
import Footer from "./Footer"
import ProfileQR from "./ProfileQR"
import BusinessCard from "./BusinessCard"

ReactGA.send({ hitType: "pageview", page: window.location.pathname })

const Layout = () => {
  const [isCardView, setIsCardView] = useState(false)

  return (
    <div className={`layout-container ${isCardView ? "mode-card" : "mode-profile"}`}>
      {/* Top Icon - animates out during morph */}
      <div className="layout-top-icon anim-top-elem">
        <TopIcon />
      </div>

      {/* Shared Stage for Morphing */}
      <div className="scene-stage">
        {/* Normal Profile Elements that converge into the card */}
        <div className="profile-elements-flow" aria-hidden={isCardView}>
          <div className="anim-avatar">
            <ProfileSection />
          </div>

          <div className="icon-row anim-icons-row">
            <AddContact />
            <MeetingScheduler />
            <AdditionalInfo onClick={() => setIsCardView(true)} />
          </div>

          <div className="anim-qr">
            <ProfileQR />
          </div>
        </div>

        {/* Business Card Stage that expands from the converged elements */}
        <div className="business-card-flow" aria-hidden={!isCardView}>
          <BusinessCard onBack={() => setIsCardView(false)} />
        </div>
      </div>

      {/* Footer - animates out during morph */}
      <div className="layout-footer anim-bottom-elem">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
