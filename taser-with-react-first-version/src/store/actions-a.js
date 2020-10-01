import C from './constants-a'
import { v4 } from 'uuid'
import * as h from './actions-helpers'
import moment from 'moment'

// 15 action creators

// Action type ADD_TASER :
export const addTaser = (name) =>
    ({
        type: C.ADD_TASER,
        taserDef:{taserId:v4(),name,auth:false},
        taserDays:[],
        users:[],
        vacations:[]
    })

// Action type REMOVE_TASER :
export const removeTaser = (taserId) =>
    ({
        type: C.REMOVE_TASER,
        taserDef:{taserId}
    })

// Action type UPDATE_TASER_DEF :
export const renameTaser = (taserId,name) =>
    ({
        type: C.UPDATE_TASER_DEF,
        taserDef:{taserId,name}
    })

// Action type UPDATE_TASER_DEF_AUTH :
export const toggleTaserAuth = (taserId,auth) =>
    ({
        type: C.UPDATE_TASER_DEF_AUTH,
        taserDef:{taserId,auth}
    })

// Action type ADD_TASER_DAY :
export const addDayInTaser = (date,taserId) =>
    ({
        type: C.ADD_TASER_DAY,
        taserDef:{taserId},
        dayId:h.dayKey(date),
        dayDate:moment(date).format("YYYY-MM-DD"),
        dayAtWorkUsers:[],
        dayWithDesiderataUsers:[]
    })



// Action type REMOVE_TASER_DAY :
export const removeDayInTaser = (dayId,taserId) =>
    ({
        type: C.REMOVE_TASER_DAY,
        taserDef:{taserId},
        dayId:dayId
    })

// Action type ADD_TASER_USER :
export const addUserInTaserConfig = (taserId,name,endDate) =>
    ({
        type: C.ADD_TASER_USER,
        taserDef:{taserId},
        userId:v4(),
        name,
        endDate,
        partialTimes:[]
    })

// Action type REMOVE_TASER_USER :
export const removeUserInTaserConfig = (taserId,userId) =>
    ({
        type: C.REMOVE_TASER_USER,
        taserDef:{taserId},
        userId
    })

// Action type ADD_TASER_VACATION :
export const addVacationInTaserConfig = (taserId,name,color,shortKey,isNeeded,isUniqueInDayTab) =>
    ({
        type: C.ADD_TASER_VACATION,
        taserDef:{taserId},
        vacationId:v4(),
        name,
        color,
        shortKey:shortKey.toLowerCase(),
        isNeeded,
        isUniqueInDayTab,
        tasersShared:[]
    })

// Action type REMOVE_TASER_VACATION :
export const removeVacationInTaserConfig = (taserId,vacationId) =>
    ({
        type: C.REMOVE_TASER_VACATION,
        taserDef:{taserId},
        vacationId
    })

// Action type ADD_TASER_DAY_AT_WORK_USER :
export const addUserAndVacationInDayInTaser = (taserId,dayId,userId,vacationId) =>
    ({
        type: C.ADD_TASER_DAY_AT_WORK_USER,
        taserDef:{taserId},
        ElementAtWorkThisDayId:v4(),
        dayId,
        vacationId,
        userId
    })

// Action type ADD_TASER_DAY_WITH_DESIDERATA_USER :
export const addUserAndDesiderataInDayInTaser = (taserId,dayId,userId,desiderataId) =>
    ({
        type: C.ADD_TASER_DAY_WITH_DESIDERATA_USER,
        taserDef:{taserId},
        ElementWithDesiderataThisDayId:v4(),
        dayId,
        desiderataId,
        userId
    })

// Action type ADD_TASER_USER_PARTIALTIME :
export const addPartialtimeInUserConfig = (taserId,userId,quotite,startDate,endDate) =>
    ({
        type: C.ADD_TASER_USER_PARTIALTIME,
        taserDef:{taserId},
        partialtimeId:v4(),
        userId,
        quotite,
        startDate,
        endDate
    })

// Action type ADD_TASER_VACATION_SHAREDTASER :
export const addtasersSharedInVacationConfig = (taserId,vacationId,taserToSharedId) =>
    ({
        type: C.ADD_TASER_VACATION_SHAREDTASER,
        taserDef:{taserId},
        vacationId,
        taserToSharedId
    })

// Action type REMOVE_TASER_DAY_AT_WORK_USER :
export const removeOneUserAtWorkInDayInTaser = (taserId,dayId,userId) =>
    ({
        type: C.REMOVE_TASER_DAY_AT_WORK_USER,
        taserDef:{taserId},
        dayId,
        userId
        //ElementAtWorkThisDayId
    })

// Action type REMOVE_TASER_DAY_WITH_DESIDERATA_USER :
export const removeOneUserWithDesiderataInDayInTaser = (taserId,dayId,userId) =>
    ({
        type: C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER,
        taserDef:{taserId},
        dayId,
        userId
        //ElementWithDesiderataThisDayId
    })

// Action type REMOVE_TASER_USER_PARTIALTIME :
export const removeOnePartialtimeInUserInTaserConfig= (taserId,userId,partialtimeId) =>
    ({
        type: C.REMOVE_TASER_USER_PARTIALTIME,
        taserDef:{taserId},
        userId,
        partialtimeId
    })

// Action type REMOVE_TASER_VACATION_SHAREDTASER :
export const removeOneSharedtaserInVacationInTaserConfig = (taserId,vacationId,taserToUnsharedId) =>
    ({
        type: C.REMOVE_TASER_VACATION_SHAREDTASER,
        taserDef:{taserId},
        vacationId,
        taserToUnsharedId
    })