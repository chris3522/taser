import * as actions from '../Taser-ui/Reducer/actions'

const inputHandleBlur = async ({ ...args }) => {
    const { e, dispatchActionDays, userId, dayNumber, saveVacationOrDesiderataId } = args
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
    console.log("saveVacationOrDesiderata:")
    console.log(result0)
    //erase day if target is empty (because backspace or del key action)
    const result1 = target.length === 0 && !saveVacationOrDesiderataId ? dispatchActionDays(actions.removeDayInActionLog(userId,dayNumber)) : ""
    console.log("saveVacationOrDesiderata: " + result1)
}

export default inputHandleBlur