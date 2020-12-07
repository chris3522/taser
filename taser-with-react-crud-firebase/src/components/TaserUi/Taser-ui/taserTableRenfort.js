import React from "react"
import TaserTbodyRenfortLine from './taserTbodyRenfortLine'
import styles from './renfort.module.css'

const TaserTableRenfort = (props) => {
    const { selectedDate,
        numberOfDays,
        activeSelectedDate,
        userAuthId,
        renforts,
        renfortYears,
        isRequiredVacationsNumber } = props
    const linesNumber = isRequiredVacationsNumber

    return (
        <tbody className={styles.bodyTab}>
            {linesNumber === undefined ? <tr></tr> : [...Array(linesNumber)].map((n, i) =>
                <TaserTbodyRenfortLine key={i}
                    selectedDate={selectedDate}
                    numberOfDays={numberOfDays}
                    activeSelectedDate={activeSelectedDate} //unused
                    userId={i}
                    taserRenfortId={renforts.taserId}
                    userAuthId={userAuthId}
                    renfortYears={renfortYears}
                />
            )}
        </tbody>
    )
}

export default TaserTableRenfort