import React from "react"
import moment from 'moment'
import TaserInputCell from './taserInputCell'
import uiPass from '../../../lib/env'

const accessAllLines = uiPass.PWDTASERUI

const TaserTbodyLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    const { selectedDate, numberOfDays } = props
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const { taserUsers, userId, userAuthId, threeYears, actionDays } = props
    const { handleKeyPress, handleKeyUp, handleFocus, handleBlur } = props

    const user = taserUsers.filter(user => userId === user.id)[0]
    const actionDaysReduce = actionDays && actionDays.reduceRight((acc, day) => {
        if (acc.filter(d => d.dayNumber === day.dayNumber).length === 0) {
            acc.push(day);
        }
        return acc
    }, [])
    const actionDaysReduce1 = actionDaysReduce && actionDaysReduce.length > 0 ?
        Array({
            [userId]: actionDaysReduce
                .filter(d => d.userId === userId)
                .map(d => ({ [d.dayNumber]: Array(d) }))
        })
        : []
    const userDaysConcat = threeYears
        .filter(u => Object.keys(u)[0].toString() === userId)
        .concat(actionDaysReduce1)
        .map(u => u[Object.keys(u)[0]].map(u => u[parseInt(Object.keys(u)[0])]))
        .reduce((a, b) => a.concat(b)).map(u => u[0])
    const userDays = userDaysConcat && userDaysConcat.reduceRight((acc, day) => {
        if (acc.filter(d => d.dayNumber === day.dayNumber).length === 0) {
            acc.push(day);
        }
        return acc
    }, [])

    //console.log(userDays)

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