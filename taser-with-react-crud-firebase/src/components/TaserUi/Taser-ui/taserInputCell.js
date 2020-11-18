import React from "react"
import styles from './taserInputCell.module.css'

const TaserInputCell = (props) => {
    const {
        userId,
        dayNumber,
        dayVacationOrDesiderata,
        auth,
        /******Handlers********* */
        handleFocus,
        handleKeyPress,
        handleKeyUp,
        handleBlur
    } = props
    //TODO : faire un match avec l'id des bases desideratas et vacations avant de proposer la couleur enregistrée pour ce jour
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
            onKeyPress={!auth ? null : handleKeyPress}
            onKeyUp={!auth ? null : handleKeyUp}
            onFocus={!auth ? null : handleFocus}
            onBlur={!auth ? null : (e, ...args) => handleBlur({ e, dayNumber, userId, ...args })}
        />
    )
}

export default TaserInputCell