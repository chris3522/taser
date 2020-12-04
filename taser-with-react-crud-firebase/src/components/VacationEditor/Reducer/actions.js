import C from './constants'
import short from 'short-uuid'

export const addVacation = (newData) =>
    ({
        type: C.ADD_VACATION,
        id: short().new(),
        name: newData.name,
        isRequired: newData.isRequired,
        nature: newData.nature,
        color: newData.color,
        shortKey: newData.shortKey
    })

export const removeVacation = (vacation) =>
    ({
        type: C.REMOVE_VACATION,
        id: vacation.id
    })

export const updateVacation = (vacation) =>
    ({
        type: C.UPDATE_VACATION,
        id: vacation.id,
        name: vacation.name,
        isRequired: vacation.isRequired,
        nature: vacation.nature,
        color: vacation.color,
        shortKey: vacation.shortKey
    })

export const initState = (state) =>
    ({
        type: C.INIT_VACATIONS,
        state:state
    })