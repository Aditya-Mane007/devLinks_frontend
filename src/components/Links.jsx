import React from "react"
import Link from "./Link"

const Links = ({ links }) => {
  return (
    <>
      {links.map((link, index) => (
        <Link link={link} index={index} key={link._id} />
      ))}
    </>
  )
}

export default Links
