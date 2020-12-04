import C from './constants'

export const desideratas = (state = [], action) => {
    switch (action.type) {
        case C.INIT_DESIDERATAS:
            return action.state
        case C.ADD_DESIDERATA:
            return state.concat(desiderata({}, action))
        case C.REMOVE_DESIDERATA:
            return state.filter(u => u.id !== action.id)
        case C.UPDATE_DESIDERATA:
            return state.filter(u => u.id !== action.id).concat(desiderata({}, action))
        default:
            return state
    }
}

export const desiderata = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_DESIDERATA:
            return {
                id: action.id,
                name: action.name,
                isRequired: action.isRequired,
                nature: action.nature,
                color: action.color,
                shortKey: action.shortKey
            }
        case C.UPDATE_DESIDERATA:
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