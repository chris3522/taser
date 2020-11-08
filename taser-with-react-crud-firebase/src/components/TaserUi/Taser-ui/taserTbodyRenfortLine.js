import React from "react"
import useSWR from "swr"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
//import styles from './taserTbodyLine.module.css'
import * as api_root_renfort from "../../../api/days"

const TaserTbodyRenfortLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { rangeOfDays, userAuthId, userId, taserRenfortId, linesNumber } = props
    const swrKey = `/days/${taserRenfortId}/${userId}`
    const rangeOfDaysInt =  parseInt(rangeOfDays.replace(/-/gi, ''))
    api_root_renfort.getRenfortDays(taserRenfortId, userId, rangeOfDaysInt)
    const { data: userDays, error: errorDays } = useSWR([taserRenfortId, userId, rangeOfDaysInt, linesNumber, swrKey], api_root_renfort.getRenfortDays)
    if (errorDays) return <tr><td>Error loading data!</td></tr>
    else if (!userDays) return <tr><td>Loading...</td></tr>
    else {
        return (
            <tr>
                <td>{`Refrt ${userId}`}</td>
                {[...Array(numberOfDays)].map((n, i) => {
                    let dayDate = moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
                    let dayNumber = parseInt(dayDate.replace(/-/gi, ''))
                    let dayVacationOrDesiderata = userDays && userDays.filter(day => day.dayNumber === dayNumber).length > 0 ? userDays.filter(day => day.dayNumber === dayNumber)[0] : {}
                    return dayVacationOrDesiderata && <td key={`${dayDate}-${userId}`}>
                        <TaserInputCell
                            auth={userAuthId}
                            userId={userId}
                            dayNumber={dayNumber}
                            dayVacationOrDesiderata={dayVacationOrDesiderata}
                        />
                    </td>
                }
                )}
            </tr>
        )
    }
}

export default TaserTbodyRenfortLine