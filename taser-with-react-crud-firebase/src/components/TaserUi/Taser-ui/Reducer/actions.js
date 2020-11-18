import C from './constants'

// Action type ADD_TASER_DAY :

export const addDayInTaser = (newData) =>
    ({
        type: C.ADD_USER_DAY,
        dayNumber: newData.dayNumber,
        userId: newData.userId,
        nature: newData.nature,
        isRequired: newData.isRequired,
        name: newData.name,
        vacOrDesId: newData.vacOrDesId,
        color: newData.color
    })
export const removeDayInTaser = (userId,dayNumber) =>
    ({
        type: C.REMOVE_USER_DAY,
        dayNumber: dayNumber,
        userId: userId
    })

export const addDayInActionLog = (newData) =>
    ({
        type: C.ADD_DAY,
        dayNumber: newData.dayNumber,
        userId: newData.userId,
        nature: newData.nature,
        isRequired: newData.isRequired,
        name: newData.name,
        vacOrDesId: newData.vacOrDesId,
        color: newData.color
    })

export const removeDayInActionLog = (userId,dayNumber) =>
    ({
        type: C.REMOVE_DAY,
        dayNumber: dayNumber,
        userId: userId
    })
