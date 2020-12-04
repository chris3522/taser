import C from './constants'

export const vacations = (state = [], action) => {
    switch (action.type) {
        case C.INIT_VACATIONS:
            return action.state
        case C.ADD_VACATION:
            return state.concat(vacation({}, action))
        case C.REMOVE_VACATION:
            return state.filter(u => u.id !== action.id)
        case C.UPDATE_VACATION:
            return state.filter(u => u.id !== action.id).concat(vacation({}, action))
        default:
            return state
    }
}

export const vacation = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_VACATION:
            return {
                id: action.id,
                name: action.name,
                isRequired: action.isRequired,
                nature: action.nature,
                color: action.color,
                shortKey: action.shortKey
            }
        case C.UPDATE_VACATION:
            return {
                id: action.id,
                name: action.name,
                isRequired: action.isRequired,
                nature: action.nature,
                color: action.color,
                shortKey: action.shortKey
            }
        default:
            return state
    }
}