import React from "react"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import * as api_root_info from "../../api/info"
import * as api_root_renfort from "../../api/renforts"

const TaserUi = ({ className, taserId, user, setAuthAdmin }) => {
       /* const connected = {
            "connected":true,
        }
        const { data: taserConnectedAdmin, error: errorConnectedAdmin } = useSWR([taserId, "connected"], api_root_info.getConnectedAdmin)   */  
        const {data : renforts, error : errorRenforts } = useSWR([taserId, "renforts"], api_root_renfort.getRenforts)
       /* if (errorConnectedAdmin) return <p>Error loading data!</p>
        else if (!taserConnectedAdmin) return <p>Loading...</p>*/
        if (errorRenforts) return <p>Error loading data!</p>
        else if (!renforts) return <p>Loading...</p>
        else if (user) {
            return (
                <div className={`${className}`}>
                    <Taser taserId={taserId} renforts={renforts} setAuthAdmin={setAuthAdmin}/>
                </div>
            )
        }
}

export default TaserUi