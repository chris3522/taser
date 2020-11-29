import React from "react"
import moment from 'moment'
//import styles from './taserTheadLine.module.css'
import ActiveTheadCell from './activeTheadCell'

const TaserTheadLine = (props) => {
    //selectedDate = date incluse dans la semaine du taser qui s'affiche
    //activeSelectedDate = date selectionnée par l'utisateur (pas forcément incluse dans ce taser)
    const { selectedDate, numberOfDays, activeSelectedDate } = props
    const { allDaysFromAllPersistTasers, isRequiredVacationsNumber } = props
    const activeSelectedDateFormat = moment(activeSelectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const dateOfFirstMondayCurrentWeek = moment(selectedDate, 'YYYY-MM-DD').startOf('isoWeek').format("YYYY-MM-DD")
    const reducer = (acc, dayUsers) => {
        if(dayUsers.isRequired==="required" || dayUsers.isRequired==="renfort") {
            acc++
        }
        return acc
    }
    return (
        <tr><th></th>
            {[...Array(numberOfDays)].map((n, i) => {
                let dayDate = moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
                let dayNumber = parseInt(dayDate.replace(/-/gi, ''))
                let hasRequiredVacations = allDaysFromAllPersistTasers
                    .filter(day=> day.dayNumber=== dayNumber)
                    .reduce(reducer,0)
                return <ActiveTheadCell
                    key={i}
                    date={dayDate}
                    activeDate={activeSelectedDateFormat}
                    weekend={moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD')
                        .add(i, 'days')
                        .days() === 0 || moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD')
                            .add(i, 'days')
                            .days() === 6 ? true : false}
                    hasRequiredVacations = {hasRequiredVacations}
                    isRequiredVacationsNumber = {isRequiredVacationsNumber}
                >
                    {moment(dateOfFirstMondayCurrentWeek, 'YYYY-MM-DD')
                        .add(i, 'days')
                        .locale("Fr")
                        .format('dd DD')}
                </ActiveTheadCell>}
            )}
        </tr>
    )
}

export default TaserTheadLine