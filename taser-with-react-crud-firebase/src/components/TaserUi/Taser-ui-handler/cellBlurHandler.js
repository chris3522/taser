import * as api_root_days from "../../../api/days"

const inputHandleBlur = async ({ ...args }) => {
    const { e, taserId, userId, dayNumber, saveVacationOrDesiderataId, mutation } = args
    e.preventDefault()
    const target = [...e.target.value] 
    const newData = saveVacationOrDesiderataId ? {
        "dayNumber": dayNumber,
        "userId": userId,
        "nature": saveVacationOrDesiderataId.nature,
        "name": saveVacationOrDesiderataId.name,
        "vacOrDesId": saveVacationOrDesiderataId.id,
        "color": saveVacationOrDesiderataId.color
    } : ""
    //save day if it exists
    const result = await saveVacationOrDesiderataId ? api_root_days.createDay({taserId, userId, newData}).then(()=>mutation()) : ""
    //erase day if target is empty (because backspace or del key action)
    const result2 = await target.length === 0 && !saveVacationOrDesiderataId ? api_root_days.deleteDay({taserId, userId, dayNumber}).then(()=>mutation()) : ""
}

export default inputHandleBlur