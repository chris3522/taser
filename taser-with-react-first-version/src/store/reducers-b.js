import C from './constants-b'

//Ajout d'une seconde branche à l'arbre du store
//pour gérer les dates sélectionnées 
//4 reducers pour cette branche : branche B : gestion des dates courantes

export const datesUsed = (state={}, action) => {
    switch (action.type) {
        case C.SET_CURRENT_DATE:
            return {
                ...state,
                currentDate:currentDate(state.currentDate,action)
                }
        case C.SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate:selectedDate(state.selectedDate,action)
                }
        case C.SET_DEEP_TASER_DATE:
            return {
                ...state,
                deepTaserDate:deepTaserDate(state.deepTaserDate,action)
                }
        default:
            return state
    }
}

export const currentDate = (state={}, action) => {
    switch (action.type) {
        case C.SET_CURRENT_DATE:
            return action.currentDate
        default:
            return state
    }
}

export const selectedDate = (state={}, action) => {
    switch (action.type) {
        case C.SET_SELECTED_DATE:
            return action.selectedDate
        default:
            return state
    }
}

export const deepTaserDate = (state={}, action) => {
    switch (action.type) {
        case C.SET_DEEP_TASER_DATE:
            return action.deepTaserDate
        default:
            return state
    }
}