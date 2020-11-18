const C = require('./constants')

// Action type ADD_TASER_DAY :
/*export const addDayInTaser = (newData) =>
    ({
        type: C.ADD_TASER_DAY,
        dayNumber: newData.dayNumber,
        userId: newData.userId,
        nature: newData.nature,
        isRequired: newData.isRequired,
        name: newData.name,
        vacOrDesId: newData.id,
        color: newData.color
    })
// Action type REMOVE_TASER_DAY :
export const removeDayInTaser = (dayNumber) =>
    ({
        type: C.REMOVE_TASER_DAY,
        dayNumber: dayNumber
    })
*/
const addDayInTaser2 = (newData) =>
    ({
        type: C.ADD_USER_DAY,
        dayNumber: newData.dayNumber,
        userId: newData.userId,
        nature: newData.nature,
        isRequired: newData.isRequired,
        name: newData.name,
        vacOrDesId: newData.id,
        color: newData.color
    })

const removeDayInTaser2 = (userId,dayNumber) =>
    ({
        type: C.REMOVE_USER_DAY,
        dayNumber: dayNumber,
        userId: userId
    })


const addDayInActionLog = (newData) =>
    ({
        type: C.ADD_DAY,
        dayNumber: newData.dayNumber,
        userId: newData.userId,
        nature: newData.nature,
        isRequired: newData.isRequired,
        name: newData.name,
        vacOrDesId: newData.id,
        color: newData.color
    })

const removeDayInActionLog = (userId,dayNumber) =>
    ({
        type: C.REMOVE_DAY,
        dayNumber: dayNumber,
        userId: userId
    })

exports.addDayInTaser2 = addDayInTaser2
    
exports.removeDayInTaser2 = removeDayInTaser2

exports.addDayInSaveLog = addDayInSaveLog
exports.removeDayInSaveLog = removeDayInSaveLog
/*export const removeDayInTaser2 = (userId,dayNumber) =>
    ({
        type: C.REMOVE_USER_DAY,
        dayNumber: dayNumber,
        userId: userId
    })
export const addUser = (userId) =>
    ({
        type: C.ADD_USER,
        userId: userId
    })

    */