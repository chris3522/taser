import C from './constants'

export const renforts = (state = [], action) => {
    switch (action.type) {
        case C.INIT_RTASERS:
            return action.state
        case C.ADD_RTASER:
            return state.concat(renfort({}, action))
        case C.REMOVE_RTASER:
            return state.filter(u => u.id !== action.id)
        case C.UPDATE_RATSER:
            return state.filter(u => u.id !== action.id).concat(renfort({}, action))
        default:
            return state
    }
}

export const renfort = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_RTASER:
            return {
                id: action.id,
                adminUid: action.adminUid,
                name: action.name,
                desc: action.desc,
                taserId: action.taserId,
                targetRequiredVacationsArray: action.targetRequiredVacationsArray
            }
        case C.UPDATE_RATSER:
            return {
                id: action.id,
                name: action.name
            }
        default:
            return state
    }
}