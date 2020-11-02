import React from "react"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import * as api_root_info from "../../api/info"
import * as api_root_renfort from "../../api/renforts"

const TaserUi = ({ className, taserId, user }) => {
        const connected = {
            "connected":true,
        }
        const { data: taserConnectedAdmin, error: errorConnectedAdmin } = useSWR([taserId, "connected"], api_root_info.getConnectedAdmin)     
        const {data : renforts, error : errorRenforts } = useSWR([taserId, "renforts"], api_root_renfort.getRenforts)
        if (errorConnectedAdmin) return <p>Error loading data!</p>
        else if (!taserConnectedAdmin) return <p>Loading...</p>
        else {
            return (
                <div className={`${className}`}>
                    <Taser taserId={taserId} taserConnectedAdmin={taserConnectedAdmin} user={user} renforts={renforts}/>
                </div>
            )
        }
}

export default TaserUi