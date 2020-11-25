import React from "react"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
//import styles from './taserTbodyLine.module.css'


const TaserTbodyRenfortLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { userId, userAuthId, renfortYears, taserRenfortId } = props
    const userDays = renfortYears && renfortYears.filter( d => d.userId === userId)
  
    return (
        <tr>
            <td>{`+${userId} ${taserRenfortId}`}</td>
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


export default TaserTbodyRenfortLine