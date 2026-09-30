import React from "react"
import LogoIcon from "../assets/images/7level v3.webp"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icon-box">
        <img src={LogoIcon} alt="7level Logo" className="footer-icon" />
      </div>
      <div className="footer-text">
        <span>Powered by</span>{" "}
        <a
          href="https://7level.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bold footer-brand-link"
        >
          7level.in
        </a>
      </div>
    </footer>
  )
}

export default Footer
