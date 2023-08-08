import React from "react"
import PreviewLink from "./PreviewLink"

const PreviewLinks = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <PreviewLink link={link} key={link._id} />
      ))}
    </>
  )
}

export default PreviewLinks
