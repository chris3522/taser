import C from './constants'

export const users = (state = [], action) => {
    switch (action.type) {
        case C.INIT_USERS:
            return action.state
        case C.ADD_USER:
            return state.concat(user({}, action))
        case C.REMOVE_USER:
            return state.filter(u => u.id !== action.id)
        case C.UPDATE_USER:
            return state.filter(u => u.id !== action.id).concat(user({}, action))
        default:
            return state
    }
}

export const user = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.id,
                name: action.name
            }
        case C.UPDATE_USER:
            return {
                id: action.id,
                name: action.name
            }
        default:
            return state
    }
}