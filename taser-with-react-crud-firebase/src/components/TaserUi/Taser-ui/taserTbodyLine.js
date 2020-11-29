import React from "react"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
import uiPass from '../../../lib/env'
//import { DateUtils } from "react-day-picker"

const accessAllLines = uiPass.PWDTASERUI

const TaserTbodyLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { taserUsers, userId, userAuthId, actionDays, fourYears } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props

    const user = taserUsers.filter(user => userId === user.id)[0]
    /***********Get a user state on fly************************ */
    const actionDaysReduce = actionDays && actionDays.reduceRight((acc, day) => {
        if (acc.filter(d => d.dayNumber === day.dayNumber).length === 0 && day.userId === userId) {
            acc.push(day)
        }
        return acc
    }, [])
    const actionDaysReduce1 = actionDaysReduce && actionDaysReduce.length > 0 ? actionDaysReduce : []
    const daysToRemoveArray = actionDaysReduce1 && actionDaysReduce1.filter(day => day.actionType === "REMOVE_DAY").map(day => day.dayNumber)
    const userDays = fourYears
        .filter(day => day.userId === userId)
        .concat(actionDaysReduce1)
        .reduce((acc, day) => {
            if (!daysToRemoveArray.includes(day.dayNumber)) {
                acc.push(day)
            }
            return acc
        }, [])

    return (
        <tr>
            <td>{user.name}</td>
            {[...Array(numberOfDays)].map((n, i) => {
                let dayDate = moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
                let dayNumber = parseInt(dayDate.replace(/-/gi, ''))
                let dayVacationOrDesiderata = userDays && userDays.filter(day => day.dayNumber === dayNumber).length > 0 ? userDays.filter(day => day.dayNumber === dayNumber)[0] : {}
                return dayVacationOrDesiderata && <td key={`${dayDate}-${userId}`}>
                    <TaserInputCell
                        auth={userAuthId === userId || userAuthId === accessAllLines ? true : false}
                        userId={userId}
                        dayNumber={dayNumber}
                        dayVacationOrDesiderata={dayVacationOrDesiderata}

                        /********handlers************* */
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