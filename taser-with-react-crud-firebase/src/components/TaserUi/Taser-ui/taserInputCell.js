import React from "react"
import styles from './taserInputCell.module.css'

const TaserInputCell = (props) => {
    const {
        userId,
        dayNumber,
        dayVacationOrDesiderata,
        auth,
        mutation,
        /******Handlers********* */
        handleFocus,
        handleKeyPress,
        handleKeyUp,
        handleBlur
    } = props
    const { name, color, nature } = dayVacationOrDesiderata
    const inputStyle = {
        backgroundColor: color
    }
    const inputValue = nature === "vacation" ? name : ""
    return (
        <input type="texte"
            className={!auth ? (`${styles.inputCell} ${styles.dismissBorderCell}`) : (`${styles.inputCell} ${styles.borderCell}`)}
            readOnly={!auth}
            defaultValue={inputValue}
            style={inputStyle}
            onKeyPress={auth ? null : handleKeyPress}
            onKeyUp={auth ? null : handleKeyUp}
            onFocus={auth ? null : handleFocus}
            onBlur={auth ? null : (e, ...args) => handleBlur({ e, dayNumber, userId, mutation, ...args })}
        />
    )
}

export default TaserInputCell