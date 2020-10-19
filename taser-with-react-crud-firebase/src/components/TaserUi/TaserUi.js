import React, { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import Taser from './Taser-ui/taser'




const TaserUi = ({ className, taserId }) => {
    return (
        <div className={`${className}`}>
            <Taser taserId={taserId} />
        </div>
    )
}

export default TaserUi