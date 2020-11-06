import React from "react"
import Taser from './Taser-ui/taser'
import useSWR from "swr"
import * as api_root_info from "../../api/info"
import * as api_root_renfort from "../../api/renforts"

const TaserUi = ({ className, taserId, user, setAuthAdmin, authAdmin }) => {

        const {data : renforts, error : errorRenforts } = useSWR([taserId, "renforts"], api_root_renfort.getRenforts)
        const { data: taserConnectedAdmin, mutate: mutateConnectedAdmin } = useSWR([taserId, "authAdmin"], api_root_info.getConnectedAdmin)
        if (errorRenforts) return <p>Error loading data!</p>
        else if (!renforts) return <p>Loading...</p>
        else if (!taserConnectedAdmin) return <p>Loading...</p>
        else if (user) {
            return (
                <div className={`${className}`}>
                    <Taser taserId={taserId} renforts={renforts} setAuthAdmin={setAuthAdmin} authAdmin={authAdmin} taserConnectedAdmin={taserConnectedAdmin} mutateConnectedAdmin={mutateConnectedAdmin}/>
                </div>
            )
        }
}

export default TaserUi