import C from './constants-a'


//17 reducers définis selon l'arbre du store : branche A : gestion des tableaux de service

export const tasers = (state=[], action) => {
    switch (action.type) {
        case C.ADD_TASER:
            return [
                ...state,
                taser({},action)
            ]
        case C.REMOVE_TASER:
            return state.filter(
                t => t.taserDef.taserId !== action.taserDef.taserId
            )
        case C.UPDATE_TASER_DEF:
            return state.map(
                t => taser(t,action)
            )
        case C.UPDATE_TASER_DEF_AUTH:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_DAY:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_DAY:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_VACATION:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_USER_PARTIALTIME:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.ADD_TASER_VACATION:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_USER_PARTIALTIME:
            return state.map(
                t => taser(t,action)
            )
        case C.REMOVE_TASER_VACATION_SHAREDTASER:
            return state.map(
                t => taser(t,action)
            )
        default:
            return state
    }
}

export const taser = (state={}, action) => {
    switch (action.type) {
        case C.ADD_TASER:
            return {
                taserDef:taserDef({},action),
                taserDays:taserDays([],action), // ou bien plus simplement taserDays:[]
                users:users([],action), // ou bien plus simplement users:[]
                vacations:vacations([],action), // ou bien plus simplement vacations:[]
            }
        case C.UPDATE_TASER_DEF:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDef:taserDef(state.taserDef,action)
                }
        case C.UPDATE_TASER_DEF_AUTH:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDef:taserDef(state.taserDef,action)
                }
        case C.ADD_TASER_DAY:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.REMOVE_TASER_DAY:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.REMOVE_TASER_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                users:users(state.users,action)
                }
        case C.REMOVE_TASER_VACATION:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                vacations:vacations(state.vacations,action)
                }
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.ADD_TASER_USER_PARTIALTIME:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                users:users(state.users,action)
                }
        case C.ADD_TASER_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                users:users(state.users,action)
                }
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                vacations:vacations(state.vacations,action)
                }
        case C.ADD_TASER_VACATION:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                vacations:vacations(state.vacations,action)
                }
        case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                taserDays:taserDays(state.taserDays,action)
                }
        case C.REMOVE_TASER_USER_PARTIALTIME:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                users:users(state.users,action)
                }
        case C.REMOVE_TASER_VACATION_SHAREDTASER:
            return (state.taserDef.taserId !== action.taserDef.taserId) ?
                state:
                {
                ...state,
                vacations:vacations(state.vacations,action)
                }
        default:
            return state
    }
    
}

export const taserDef = (state={}, action) => {
    switch (action.type){
        case C.ADD_TASER:
            return {
                name:action.taserDef.name,
                taserId:action.taserDef.taserId,
                auth:action.taserDef.auth
            }
        case C.UPDATE_TASER_DEF:
            return {
                ...state,
                name:action.taserDef.name,
                //taserId:action.taserDef.taserId
            }
        case C.UPDATE_TASER_DEF_AUTH:
            return {
                ...state,
                auth:action.taserDef.auth,
                //taserId:action.taserDef.taserId
            }
        default:
            return state
    }
    
}


export const taserDays = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER:
            return state
        case C.ADD_TASER_DAY:
            return [
                ...state,
                taserDay({},action)
            ]
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return state.map(
               d => taserDay(d,action)
            )
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return state.map(
               d => taserDay(d,action)
            )
        case C.REMOVE_TASER_DAY:
            return state.filter(
                d => d.dayId !== action.dayId
            )
        case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return state.map(
               d => taserDay(d,action)
            )
        case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return state.map(
               d => taserDay(d,action)
            )
        default:
            return state
    }
    
}

export const taserDay = (state={}, action) => {
    switch (action.type){
        case C.ADD_TASER_DAY:
            return {
                dayId:action.dayId,
                dayDate:action.dayDate,
                dayWithDesiderataUsers:dayWithDesiderataUsers([],action),
                dayAtWorkUsers:dayAtWorkUsers([],action) // ou bien plus simplement dayAtWorkUsers:[]

            }
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return (state.dayId !== action.dayId) ? 
                state:{
                    ...state,
                    dayAtWorkUsers:dayAtWorkUsers(state.dayAtWorkUsers,action)
                }
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return (state.dayId !== action.dayId) ? 
                state:{
                    ...state,
                    dayWithDesiderataUsers:dayWithDesiderataUsers(state.dayWithDesiderataUsers,action)
                }
        case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return (state.dayId !== action.dayId) ? 
                state:{
                    ...state,
                    dayAtWorkUsers:dayAtWorkUsers(state.dayAtWorkUsers,action)
                    
                }
        case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return (state.dayId !== action.dayId) ? 
                state:{
                    ...state,
                    dayWithDesiderataUsers:dayWithDesiderataUsers(state.dayWithDesiderataUsers,action)
                    
                }
        default:
            return state
    }
}

export const dayAtWorkUsers = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER_DAY:
            return state
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return [
                ...state,
                dayAtWorkUser({},action)
            ]
       /* case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return state.filter(
                du => du.ElementAtWorkThisDayId !== action.ElementAtWorkThisDayId
            )*/
        case C.REMOVE_TASER_DAY_AT_WORK_USER:
            return state.filter(
                du => du.userId !== action.userId
            )
        default:
            return state
    }
}

export const dayWithDesiderataUsers = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER_DAY:
            return state
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return [
                ...state,
                dayWithDesiderataUser({},action)
            ]
        /*case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return state.filter(
                du => du.ElementWithDesiderataThisDayId !== action.ElementWithDesiderataThisDayId
            )*/
        case C.REMOVE_TASER_DAY_WITH_DESIDERATA_USER:
            return state.filter(
                du => du.userId !== action.userId
            )
        default:
            return state
    }
}

export const dayAtWorkUser = (state={}, action) => {
    switch (action.type){
        case C.ADD_TASER_DAY_AT_WORK_USER:
            return {
                ElementAtWorkThisDayId:action.ElementAtWorkThisDayId,
                dayId:action.dayId,
                vacationId:action.vacationId,
                userId:action.userId
            }
        default:
            return state
    }
}

export const  dayWithDesiderataUser = (state={}, action) => {
    switch (action.type){
        case C.ADD_TASER_DAY_WITH_DESIDERATA_USER:
            return {
                ElementWithDesiderataThisDayId:action.ElementWithDesiderataThisDayId,
                dayId:action.dayId,
                desiderataId:action.desiderataId,
                userId:action.userId
            }
        default:
            return state
    }
}

export const users = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER:
            return state
        case C.ADD_TASER_USER:
            return [
                ...state,
                user({},action)
            ]
        case C.REMOVE_TASER_USER:
            return state.filter(
                u => u.userId !== action.userId
            )
        case C.ADD_TASER_USER_PARTIALTIME:
            return state.map(
               u => user(u,action)
            )
         case C.REMOVE_TASER_USER_PARTIALTIME:
            return state.map(
               u => user(u,action)
            )
        default:
            return state
    }
}

export const user = (state={}, action) => {
     switch (action.type){
        case C.ADD_TASER_USER:
            return {
                userId:action.userId,
                name:action.name,
                endDate:action.endDate,
                partialTimes:partialTimes([],action) // ou bien plus simplement partialTimes:[]
            }
        case C.ADD_TASER_USER_PARTIALTIME:
            return (state.userId !== action.userId) ? 
                state:{
                    ...state,
                    partialTimes:partialTimes(state.partialTimes,action)
                }
        case C.REMOVE_TASER_USER_PARTIALTIME:
            return (state.userId !== action.userId) ? 
                state:{
                    ...state,
                    partialTimes:partialTimes(state.partialTimes,action)
                }
        default:
            return state
    }
}

export const partialTimes = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER_USER:
            return state
        case C.ADD_TASER_USER_PARTIALTIME:
            return [
                ...state,
                partialTime({},action)
            ]
        case C.REMOVE_TASER_USER_PARTIALTIME:
            return state.filter(
                pu => pu.partialtimeId !== action.partialtimeId
            )
        default:
            return state
    }
}

export const partialTime = (state={}, action) => {
    switch (action.type){
        case C.ADD_TASER_USER_PARTIALTIME:
            return {
                partialtimeId:action.partialtimeId,
                quotite:action.quotite,
                startDate:action.startDate,
                endDate:action.endDate
            }
        default:
            return state
    }
}

export const vacations = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER:
            return state
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return state.map(
               v => vacation(v,action)
            )
        case C.ADD_TASER_VACATION:
            return [
                ...state,
                vacation({},action)
            ]
        case C.REMOVE_TASER_VACATION:
            return state.filter(
                v => v.vacationId !== action.vacationId
            )
        case C.REMOVE_TASER_VACATION_SHAREDTASER:
            return state.map(
               v => vacation(v,action)
            )
        default:
            return state
    }
}

export const vacation = (state={}, action) => {
     switch (action.type){
        case C.ADD_TASER_VACATION:
            return {
                vacationId:action.vacationId,
                name:action.name,
                color:action.color,
                shortKey:action.shortKey,
                isNeeded:action.isNeeded,
                isUniqueInDayTab:action.isUniqueInDayTab,
                tasersShared:sharedTasers([],action) // ou bien plus simplement tasersShared:[]
            }
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return (state.vacationId !== action.vacationId) ? 
                state:{
                    ...state,
                    tasersShared:sharedTasers(state.tasersShared,action)
                }
        case C.REMOVE_TASER_VACATION_SHAREDTASER:
           return (state.vacationId !== action.vacationId) ? 
                state:{
                    ...state,
                    tasersShared:sharedTasers(state.tasersShared,action)
                }
        default:
            return state
    }
}

export const sharedTasers = (state=[], action) => {
    switch (action.type){
        case C.ADD_TASER_VACATION:
            return state
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return [
                ...state,
                sharedTaser("",action)
            ]
        case C.REMOVE_TASER_VACATION_SHAREDTASER:
            return state.filter(
                tasersShared => tasersShared !== action.taserToUnsharedId
            )
        default:
            return state
    }
}

export const sharedTaser = (state="", action) => {
    switch (action.type){
        case C.ADD_TASER_VACATION_SHAREDTASER:
            return action.taserToSharedId
        default:
            return state
    }
}

