import * as api_root_days from "../../../api/days"
import * as actions from '../Taser-ui/Reducer/actions'

const inputHandleBlur = async ({ ...args }) => {
    const { e, taserId, dispatchActionDays, userId, dayNumber, saveVacationOrDesiderataId, mutateDays } = args
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
    
      console.log(newData)
    const result0 = saveVacationOrDesiderataId ? dispatchActionDays(actions.addDayInActionLog(newData)) : ""
    console.log(result0)
    const result = await saveVacationOrDesiderataId ? api_root_days.createDay({taserId, userId, newData}).then(()=>mutateDays()) : ""

    //const result = await saveVacationOrDesiderataId ? api_root_days.createDay({taserId, userId, newData}) : ""
    console.log("saveVacationOrDesiderata:")
    console.log(result)
    //erase day if target is empty (because backspace or del key action)
    const result3 = target.length === 0 && !saveVacationOrDesiderataId ? dispatchActionDays(actions.removeDayInActionLog(userId,dayNumber)) : ""
    const result2 = await target.length === 0 && !saveVacationOrDesiderataId ? api_root_days.deleteDay({taserId, userId, dayNumber}).then(()=>mutateDays()) : ""
    //console.log(result3)
    console.log("saveVacationOrDesiderata: " + result2)
}

export default inputHandleBlur