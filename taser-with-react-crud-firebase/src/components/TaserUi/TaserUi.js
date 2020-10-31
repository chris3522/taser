import React, { useEffect, useRef, useState } from "react"
import { navigate, Link } from "@reach/router"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import * as api_root_info from "../../api/info"

const TaserUi = ({ className, taserId, user }) => {
        const connected = {
            "connected":true,
        }
        const { data: taserConnectedAdmin, error: errorConnectedAdmin } = useSWR([taserId, "connected"], api_root_info.getConnectedAdmin)     
        if (errorConnectedAdmin) return <p>Error loading data!</p>
        else if (!taserConnectedAdmin) return <p>Loading...</p>
        else {
            return (
                <div className={`${className}`}>
                    <Taser taserId={taserId} taserConnectedAdmin={taserConnectedAdmin}/>
                </div>
            )
        }
}

export default TaserUi