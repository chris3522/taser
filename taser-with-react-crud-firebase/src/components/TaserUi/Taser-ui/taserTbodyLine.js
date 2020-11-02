import React from "react"
import useSWR from "swr"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
//import styles from './taserTbodyLine.module.css'
import * as api_root_days from "../../../api/days"
import uiPass from '../../../lib/env'

const secret =  uiPass.PWDTASERUI

const TaserTbodyLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { taserUsers, userId, taserId, userAuthId, rangeOfDays } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props
    const user = taserUsers.filter(user => userId === user.id)[0]
    const swrKey = `/days/${taserId}/${userId}`
    const rangeOfDaysInt =  parseInt(rangeOfDays.replace(/-/gi, ''))
    const { data: userDays, error: errorDays, mutate: mutateDays } = useSWR([taserId, userId, rangeOfDaysInt, swrKey], api_root_days.getDays)
    if (errorDays) return <tr><td>Error loading data!</td></tr>
    //else if (!userDays) return <tr><td>Loading...</td></tr>
    else {
        return (
            <tr>
                <td>{user.name}</td>
                {[...Array(numberOfDays)].map((n, i) => {
                    let dayDate = moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
                    let dayNumber = parseInt(dayDate.replace(/-/gi, ''))
                    let dayVacationOrDesiderata = userDays && userDays.filter(day => day.dayNumber === dayNumber).length > 0 ? userDays.filter(day => day.dayNumber === dayNumber)[0] : {}
                    return dayVacationOrDesiderata && <td key={`${dayDate}-${userId}`}>
                        <TaserInputCell
                            auth={userAuthId === userId || userAuthId === secret ? true : false}
                            userId={userId}
                            dayNumber={dayNumber}
                            dayVacationOrDesiderata={dayVacationOrDesiderata}
                            mutation={mutateDays}
                            /******handlers********** */
                            handleKeyPress={handleKeyPress}
                            handleKeyUp={handleKeyUp}
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                        />
                    </td>
                }
                )}
            </tr>
        )
    }
}

export default TaserTbodyLine