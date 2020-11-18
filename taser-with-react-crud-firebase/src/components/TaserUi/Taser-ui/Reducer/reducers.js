import C from './constants'

export const usersYears = (state=[], action) => {
    const year = Math.floor(action.dayNumber/10000)
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === year.toString()).length>0) {  
                return state.map( u => userYears(u,action) )
            }
            else {
                return state.concat([{[year]:[],changed:true}]).map(u => userYears(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === year.toString()).length>0) {      
                return state.map( u => userYears(u,action) )
            }
            else {
                return state.concat([{[year]:[],changed:true}]).map(u => userYears(u,action))     
            }
        default:
            return state
    }
}

export const userYears = (state={}, action) => {
    const year = Math.floor(action.dayNumber/10000)
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== year.toString()) ?
                state:
                {
                ...state,
                [year]:usersDays(state[year],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== year.toString()) ?
                state:
                {
                ...state,
                [year]:usersDays(state[year],action),
                changed:true
                }
        default:
            return state
    } 
}


export const usersDays = (state=[], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.userId).length>0) {      
                return state.map( u => userDays(u,action) )
            }
            else {
                return state.concat([{[action.userId]:[],changed:true}]).map(u => userDays(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.userId).length>0) {      
                return state.map( u => userDays(u,action) )
            }
            else {
                return state.concat([{[action.userId]:[],changed:true}]).map(u => userDays(u,action))     
            }
        default:
            return state
    }
}

export const userDays = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.userId) ?
                state:
                {
                ...state,
                [action.userId]:userDay(state[action.userId],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.userId) ?
                state:
                {
                ...state,
                [action.userId]:userDay(state[action.userId],action),
                changed:true
                }
        default:
            return state
    } 
}


export const userDay = (state=[], action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.dayNumber.toString()).length>0) {
                return state.map( u => days(u,action) )
            }
            else {
                return state.concat([{[action.dayNumber]:[],changed:true}]).map(u => days(u,action))     
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u).filter(v => v !== "changed")[0] === action.dayNumber.toString()).length>0) {
                return state.map( u => days(u,action) )
            }
            else {
                return state.concat([{[action.dayNumber]:[],changed:true}]).map(u => days(u,action)) 
            }
        default:
            return state
    }
}


export const days = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.dayNumber.toString()) ?
                state:
                {
                ...state,
                [action.dayNumber]:day1([],action),
                changed:true
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state).filter(v => v !== "changed")[0] !== action.dayNumber.toString()) ?
                state:
                {
                ...state,
                [action.dayNumber]:day1([],action),
                changed:true
                }
        default:
            return state
    }
}

export const day1 = (state=[], action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return Array(day({}, action))
        case C.REMOVE_USER_DAY:
            return Array()
        default:
            return state
    }
}


export const day = (state={}, action) => {
    switch (action.type){
        case C.ADD_USER_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                nature: action.nature,
                isRequired: action.isRequired,
                name: action.name,
                vacOrDesId: action.vacOrDesId,
                color: action.color
            }
        default:
            return state
    }
}

export const actionDays = (state=[], action) => {
    switch (action.type) {
        case C.ADD_DAY:    
            return state.concat(actionDay({},action))
        case C.REMOVE_DAY:
            return state.concat(actionDay({},action))
        default:
            return state
    }
}

export const actionDay = (state={}, action) => {
    switch (action.type){
        case C.ADD_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                nature: action.nature,
                isRequired: action.isRequired,
                name: action.name,
                vacOrDesId: action.vacOrDesId,
                color: action.color, 
                actionType: action.type
            }
        case C.REMOVE_DAY:
            return {
                dayNumber: action.dayNumber,
                userId: action.userId,
                actionType: action.type
            }
        default:
            return state
    }
}