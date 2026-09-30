import React from "react"
import ContactFile from "../assets/contacts/alvixe.vcf"

const AddContact = () => {
  return (
    <a
      href={ContactFile}
      download="Alvin-Lalduhawma.vcf"
      className="icon-item dark-bg action-card-btn"
      title="Save Contact"
    >
      <i className="fa fa-user-plus action-icon"></i>
      <span className="action-title">Contact</span>
    </a>
  )
}

export default AddContact
