import React from 'react'
import {Link as Linky} from "@reach/router"
import basePath from "../../lib/env"

const BASE = basePath.BASE

const Link = ({ to = '', children, absolute, ... props }) => {
  if (!absolute && to[0] === '/') {
    to = BASE + to
  }
  return (
    <Linky {... props} to={to}>
      {children}
    </Linky>
  )
}

export default Link