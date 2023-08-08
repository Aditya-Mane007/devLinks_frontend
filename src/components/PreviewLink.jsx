import React from "react"

import Github from "../assets/images/icon-github.svg"
import { Link } from "react-router-dom"

const PreviewLink = ({ link }) => {
  return (
    <Link
      to={link.url}
      target="_blank"
      className="w-full h-14 bg-black my-2 rounded-lg text-white flex justify-start items-center px-5 cursor-pointer"
    >
      {link.platform}
    </Link>
  )
}

export default PreviewLink
