import React from "react"
import styles from './taserInputCell.module.css'

const TaserInputCell = (props) => {
    const {
        isLoading,
        //tabVacationsAndDesideratas,
        taserVacations,
        taserDesideratas,
        //taserId,
        userId,
        dayDate,
        //desiderataColor,
        taserDayOfThisUserId,
        //dayDate,
        auth,
        /******Handlers********* */
        handleFocus,
        handleKeyPress,
        handleKeyUp,
        handleBlur
    } = props

    //init from props through config data
    const vacationId = taserDayOfThisUserId === undefined ? "" : taserDayOfThisUserId.vacationId
    const desiderataId = taserDayOfThisUserId === undefined ? "" : taserDayOfThisUserId.desiderataId
    const inputValue = vacationId === "" ? "" :  taserVacations.vacations.byId[vacationId].name
    const desiderataColor = desiderataId === "" ? "" : taserDesideratas.desideratas.byId[desiderataId].color
    const inputStyle = {
        backgroundColor: desiderataColor
    }

    return (
        <input type="texte"
            className={!auth ? (`${styles.inputCell} ${styles.dismissBorderCell}`) : (`${styles.inputCell} ${styles.borderCell}`)}
            readOnly={!auth}
            defaultValue={inputValue}
            style={inputStyle}
            onKeyPress={!auth ? null : handleKeyPress}
            onKeyUp={!auth ? null : handleKeyUp}
            onFocus={!auth ? null : handleFocus}
            onBlur={!auth ? null : handleBlur}
        /*
         onKeyPress={auth ? null :onKeyPress } 
         onKeyUp={dismiss ? null : handleKeyUp} 
         onBlur={dismiss ? null : handleFocusOut} 
         onFocus={dismiss ? null : handleFocusIn}
         key={dayId}*/
        />
    )
}

export default TaserInputCell