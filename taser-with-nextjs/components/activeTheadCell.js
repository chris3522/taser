import styles from './activeTheadCell.module.css'
import cn from 'classnames'

export default function ActiveCell({ children, date, activeDate, weekend }) {
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
        </th>
    )
}