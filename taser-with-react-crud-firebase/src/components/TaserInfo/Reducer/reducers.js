import C from './constants'

export const info = (state = {}, action) => {
    switch (action.type) {
        case C.INIT_INFO:
            return action.state
        case C.SET_INFO:
            return inf({}, action)
        default:
            return state
    }
}

export const inf = (state = {}, action) => {
    switch (action.type) {
        case C.SET_INFO:
            return {
                id: action.id,
                name: action.name,
                adminUid: action.adminUid,
                desc: action.desc,
                numberOfDays: action.numberOfDays,
                numberOfTasers: action.numberOfTasers
            }
        default:
            return state
    }
}

export const connect = (state = {}, action) => {
    switch (action.type) {
        case C.INIT_CONNECTED:
            return {
                connected: {
                    id: action.id,
                    adminUid: action.adminUid,
                    connected: action.connected
                }
            }
        case C.UPDATE_CONNECTED:
            return {
                connected: {
                    ...state.connected,
                    connected: action.connected
                }
            }
        default:
            return state
    }
}