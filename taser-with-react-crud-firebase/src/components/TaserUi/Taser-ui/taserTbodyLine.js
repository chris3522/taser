import React from "react"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
//import styles from './taserTbodyLine.module.css'

const TaserTbodyLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays, activeSelectedDate } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { taserInfo, taserUsers, taserDays, taserVacations, taserDesideratas, userId } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props
    const user = taserUsers.filter(user => userId === user.id)[0]
 
    return (
        <tr>
            <td>{user.name}</td>

            {[...Array(numberOfDays)].map((n, i) => {
                let dayDate = moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
                //check undefined before pass props : Have this day a userId ?
                let taserDayOfThisUserId =
                    taserDays.days === undefined ||
                        taserDays.days.byId[dayDate] === undefined ||
                        taserDays.days.byId[dayDate][userId] === undefined ?
                        undefined :
                        taserDays.days.byId[dayDate][userId]
                return <td key={`${dayDate}-${userId}`}>
                    <TaserInputCell
                        auth={taserInfo.auth}
                        taserDayOfThisUserId={taserDayOfThisUserId}
                        taserVacations={taserVacations}
                        taserDesideratas={taserDesideratas}
                        userId={userId}
                        dayDate={dayDate}
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

export default TaserTbodyLine