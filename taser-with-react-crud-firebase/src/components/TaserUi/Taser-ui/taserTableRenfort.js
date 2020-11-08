import React from "react"
import TaserTbodyRenfortLine from './taserTbodyRenfortLine'
import styles from './renfort.module.css'

const TaserTableRenfort = (props) => {
   const { selectedDate,
        numberOfDays,
        activeSelectedDate,
        taserInfo,
        taserVacations,
        taserDesideratas,
        rangeOfDays,
        userAuthId,
        renforts } = props
    const taserRenfortId = renforts.taserId
    const linesNumber = renforts.targetVacationsRequiredNumber
    return (
                <tbody className={styles.bodyTab}>
                    { linesNumber === undefined ? <tr></tr> :  [...Array(linesNumber)].map((n, i) => 
                        <TaserTbodyRenfortLine key={i}
                            selectedDate={selectedDate}
                            numberOfDays={numberOfDays}
                            activeSelectedDate={activeSelectedDate} //unused
                            taserInfo={taserInfo}
                            userId={i}
                            taserRenfortId={taserRenfortId}
                            taserVacations={taserVacations}
                            taserDesideratas={taserDesideratas}
                            userAuthId={userAuthId}
                            rangeOfDays={rangeOfDays}
                            linesNumber={linesNumber}
                        
                        />
                    )}
                </tbody>
            )
}

export default TaserTableRenfort