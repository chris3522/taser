import React from "react"
import styles from './activeTheadCell.module.css'
import cn from 'classnames'

export default function ActiveCell({ children, date, activeDate, weekend, isRequiredVacationsNumber, hasRequiredVacations }) {
    let type = date === activeDate ? 'dateSelected' : null
    return (
        <th
            className={cn({
                [styles.weekend]: weekend === true
            })}
        >
            <span
                className={cn({
                    [styles.dateSelected]: type === 'dateSelected',
                    [styles.capitalize]: true
                })}
            >{children}</span>
            <span
                className={cn({
                    [styles.dotRed]: hasRequiredVacations < isRequiredVacationsNumber,
                    [styles.dotOrange]: hasRequiredVacations === isRequiredVacationsNumber-1,
                    [styles.dotGreen]: hasRequiredVacations === isRequiredVacationsNumber
                })}></span>
        </th>
    )
}