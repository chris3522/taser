import * as actions from '../Taser-ui/Reducer/actions'

const inputHandleBlur = async ({ ...args }) => {
    const { e, dispatchActionDays, dispatchDataDaysPersistence, userId, dayNumber, saveVacationOrDesiderataId } = args
    e.preventDefault()
    const target = [...e.target.value] 
    const newData = saveVacationOrDesiderataId ? {
        "dayNumber": dayNumber,
        "userId": userId,
        "nature": saveVacationOrDesiderataId.nature,
        "isRequired": saveVacationOrDesiderataId.isRequired,
        "name": saveVacationOrDesiderataId.name,
        "vacOrDesId": saveVacationOrDesiderataId.id,
        "color": saveVacationOrDesiderataId.color
    } : ""
    //save day if it exists
    const result0 = saveVacationOrDesiderataId ? dispatchActionDays(actions.addDayInActionLog(newData)) : ""
    const result00 = saveVacationOrDesiderataId ? dispatchDataDaysPersistence(actions.addDayInTaser(newData)) : ""
    console.log("saveVacationOrDesiderata:")
    console.log(result0 + result00)
    //erase day if target is empty (because backspace or del key action)
    const result1 = target.length === 0 && !saveVacationOrDesiderataId ? 
        dispatchActionDays(actions.removeDayInActionLog(userId,dayNumber)) : ""
    const result11 = target.length === 0 && !saveVacationOrDesiderataId ? 
        dispatchDataDaysPersistence(actions.removeDayInTaser(userId,dayNumber)) : ""
    console.log("saveVacationOrDesiderata: " + result1+  + result11)
}

export default inputHandleBlur