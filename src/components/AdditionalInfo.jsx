import React from "react"

const AdditionalInfo = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="icon-item big-icon black-icon white-bg card-action-btn action-card-btn"
      aria-label="View Business Card"
      title="View Business Card"
      type="button"
    >
      <i className="fa fa-id-card action-icon"></i>
      <span className="action-title">Card</span>
    </button>
  )
}

export default AdditionalInfo
