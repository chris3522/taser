import C from './constants'

export const usersYears = (state = [], action) => {
    const year = Math.floor(action.dayNumber / 10000)
    switch (action.type) {
        case C.ADD_USER_DAY:
            //if (state.filter(u => Object.keys(u)[0] === year.toString()).length>0) { 
            if (state.filter(u => u.year === year.toString()).length > 0) {
                return state.map(u => userYears(u, action))
            }
            else {
                return state.concat([{ [year]: [] }]).map(u => userYears(u, action))
            }
        case C.REMOVE_USER_DAY:
            // if (state.filter(u => Object.keys(u)[0] === year.toString()).length>0) { 
            if (state.filter(u => u.year === year.toString()).length > 0) {
                return state.map(u => userYears(u, action))
            }
            else {
                return state.concat([{ [year]: [] }]).map(u => userYears(u, action))
            }
        default:
            return state
    }
}

export const userYears = (state = {}, action) => {
    const year = Math.floor(action.dayNumber / 10000)
    switch (action.type) {
        case C.ADD_USER_DAY:
            return (Object.keys(state)[0] !== year.toString()) ?
                state :
                {
                    ...state,
                    [year]: usersDays(state[year], action)
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state)[0] !== year.toString()) ?
                state :
                {
                    ...state,
                    [year]: usersDays(state[year], action)
                }
        default:
            return state
    }
}


export const usersDays = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u)[0] === action.userId).length > 0) {
                return state.map(u => userDays(u, action))
            }
            else {
                return state.concat([{ [action.userId]: [] }]).map(u => userDays(u, action))
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u)[0] === action.userId).length > 0) {
                return state.map(u => userDays(u, action))
            }
            else {
                return state.concat([{ [action.userId]: [] }]).map(u => userDays(u, action))
            }
        default:
            return state
    }
}

export const userDays = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            return (Object.keys(state)[0] !== action.userId) ?
                state :
                {
                    ...state,
                    [action.userId]: userDay(state[action.userId], action)
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state)[0] !== action.userId) ?
                state :
                {
                    ...state,
                    [action.userId]: userDay(state[action.userId], action)
                }
        default:
            return state
    }
}


export const userDay = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            if (state.filter(u => Object.keys(u)[0] === action.dayNumber.toString()).length > 0) {
                return state.map(u => days(u, action))
            }
            else {
                return state.concat([{ [action.dayNumber]: [] }]).map(u => days(u, action))
            }
        case C.REMOVE_USER_DAY:
            if (state.filter(u => Object.keys(u)[0] === action.dayNumber.toString()).length > 0) {
                return state.map(u => days(u, action))
            }
            else {
                return state.concat([{ [action.dayNumber]: [] }]).map(u => days(u, action))
            }
        default:
            return state
    }
}


export const days = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            return (Object.keys(state)[0] !== action.dayNumber.toString()) ?
                state :
                {
                    ...state,
                    [action.dayNumber]: day1([], action)
                }
        case C.REMOVE_USER_DAY:
            return (Object.keys(state)[0] !== action.dayNumber.toString()) ?
                state :
                {
                    ...state,
                    [action.dayNumber]: day1([], action)
                }
        default:
            return state
    }
}

export const day1 = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            return Array(day({}, action))
        case C.REMOVE_USER_DAY:
            return []
        default:
            return state
    }
}


export const day = (state = {}, action) => {
    switch (action.type) {
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

/*****************For Action day log******************************** */

export const actionDays = (state = [], action) => {
    switch (action.type) {
        case C.ADD_DAY:
            return state.concat(actionDay({}, action))
        case C.REMOVE_DAY:
            return state.concat(actionDay({}, action))
        case C.RESET_ACTIONDAY:
            return []
        default:
            return state
    }
}

export const actionDay = (state = {}, action) => {
    switch (action.type) {
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

/*****************For dataYears after fetching yearDays***************************** */

export const dataYears = (state = [], action) => {
    switch (action.type) {
        case C.ADD_YEAR:
            if (state.filter(u => Object.keys(u)[0] === action.year.toString()).length > 0) {
                return state.map(u => dataYear(u, action))
            }
            else {
                return state.concat([{ [action.year]: [] }]).map(u => dataYear(u, action))
            }
        default:
            return state
    }
}

export const dataYear = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_YEAR:
            return state
        default:
            return state
    }
}

/****************For action check isRequired Days******************* */
/*export const requiredDays = (state = [], action) => {
    switch (action.type) {
        case C.ADD_COUNT:
            return state.map(d => requiredDay(d, action))
        case C.REMOVE_COUNT:
            return state.map(d => requiredDay(d, action))
        default:
            return state
    }
}*/

/*****************For dataDays persistence******************************** */

export const persistDays = (state = [], action) => {
    switch (action.type) {
        case C.ADD_USER_DAY:
            return state.concat(persistDay({}, action))
        case C.REMOVE_USER_DAY:
            return state.filter(
                d => !(d.dayNumber === action.dayNumber && d.userId === action.userId)
            )
        default:
            return state
    }
}

export const persistDay = (state = {}, action) => {
    switch (action.type) {
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
