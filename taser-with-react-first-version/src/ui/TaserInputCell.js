import React from 'react'
import { dayKey } from './../store/actions-helpers'
import './../stylesheets/TaserInputCell.css';
import { Table } from 'semantic-ui-react'



const TaserInputCell = (props ) => {

    //init props
    const { taserId, taserDay, vacationId, userId, desiderataId, desiderataColor,dayDate, auth } = props   
    const { tabVacationsAndDesideratas } = props   
    const { addDayInStore=f=>f, addUserAndVacationInStore=f=>f, addUserAndDesiderataInStore=f=>f, removeVacation=f=>f, removeDesiderata=f=>f } = props
    const dayId = taserDay.dayId
    //logging user in or out with dismiss value (false : loggout)
    const dismiss = ! auth

    //init vacation (default name in cell) and desiderata (default color of cell)
    const currentDesiderata = desiderataId === "" ? "" : tabVacationsAndDesideratas
        .filter(vd => vd.desiderataId === desiderataId)[0]
    const currentVacation = vacationId === "" ? "" : tabVacationsAndDesideratas
        .filter(vd => vd.vacationId === vacationId)[0]
    //const inputValue = taserDay.dayId === undefined ? "" : currentVacation.name 
    const inputValue = vacationId === "" ? "" : currentVacation.name 
     
    const inputStyle = {
      backgroundColor: desiderataColor
    }
    
    //init for ui event handlers
    //init buffer for shorkey iteration (iterate "x" to switch desiderata)
    let buffer=0
    let colorCell="white"
    let eraseDesiderataNameAndKeepColorInstead = false
    let saveInStoreVacationOrDesiderataId = ""

    const handleFocusIn = e => {
        e.preventDefault()  
        
    }

    //key pressed must match tabVacationsAndDesirata shortKey
    //buffer used to iterate with the same shortkey
    const handleKeyPress = e => {
        
        //init
        let _entryKey=e.key.toLowerCase()
        e.preventDefault()
        const oneVacationAndDesiderata_entry = tabVacationsAndDesideratas.filter(vd => vd.shortKey === _entryKey)
        const oneVacationAndDesiderata_name = oneVacationAndDesiderata_entry[buffer] ? oneVacationAndDesiderata_entry[buffer].name : null 
        const oneVacationAndDesiderata_color = oneVacationAndDesiderata_entry[buffer] ? oneVacationAndDesiderata_entry[buffer].color : "" 
        colorCell = oneVacationAndDesiderata_color
        eraseDesiderataNameAndKeepColorInstead = colorCell === "" ? false : true

        //set target value cell on shortkey pressed
        e.target.value = oneVacationAndDesiderata_name 
        e.target.style.backgroundColor=colorCell
        saveInStoreVacationOrDesiderataId=oneVacationAndDesiderata_entry[buffer]

        //check if keypressed is iterate in a same sequence as "x x x x"  for example
        buffer = oneVacationAndDesiderata_entry.length > 1 ? ++buffer : buffer = 0 
        buffer = buffer === oneVacationAndDesiderata_entry.length ? 0 : buffer
        
        _entryKey=""     
    }

    const handleKeyUp = e => {
        e.preventDefault()  
        //Desiderata name value is replaced by her desiderata color by style
        e.target.value = eraseDesiderataNameAndKeepColorInstead ? "" : e.target.value 
    }



    const handleFocusOut = e => {
        e.preventDefault()  
        let isVacation = true
        let args =[]
        let newVacationId = ""
        let newDesiderataId = ""
        //let storeTaserDay = store.getState().tasers.filter(t => t.taserDef.taserId === taserId)[0].taserDays.filter(d => d.dayId === dayKey(dayDate))[0]
        
        for (const property in saveInStoreVacationOrDesiderataId) {
            if (property === "vacationId") {
                isVacation = true
                newVacationId = saveInStoreVacationOrDesiderataId[property]
                e.target.style.backgroundColor=currentDesiderata.color
            }
            if (property === "desiderataId") {
                isVacation = false
                newDesiderataId = saveInStoreVacationOrDesiderataId[property]
                //e.target.value=inputValue
            }
        }
        args = isVacation ? [taserId,dayKey(dayDate),userId,newVacationId] : [taserId,dayKey(dayDate),userId,newDesiderataId]
    
        let isDay = false
        if (newVacationId !== "" || newDesiderataId !== "") {
            if ( dayId === undefined && isDay === false) { 
                addDayInStore(dayDate,taserId)
                isDay = true
            }
            if ( isDay === true || dayId !== undefined ) {

                removeVacation(taserId,dayKey(dayDate),userId)
                removeDesiderata(taserId,dayKey(dayDate),userId)
                isVacation ? addUserAndVacationInStore (...args) : addUserAndDesiderataInStore (...args)
            }
       }
    }
    //const readOnly = false  readOnly={readOnly}

    return (
         <Table.Cell>
            <input  type="texte" 
                className={ dismiss ? 'inputCell dismissBorderCell' : 'inputCell borderCell' }
                readOnly={ dismiss }
                style={inputStyle} 
                defaultValue={ inputValue } 
                onKeyPress={dismiss ? null :handleKeyPress } 
                onKeyUp={dismiss ? null : handleKeyUp} 
                onBlur={dismiss ? null : handleFocusOut} 
                onFocus={dismiss ? null : handleFocusIn}
                key={dayId}
                />    
        </Table.Cell>
    )
}




export default TaserInputCell