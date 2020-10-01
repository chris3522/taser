import C from './constants-c'

//Ajout d'une seconde branche à l'arbre du store
//pour gérer les configs communes des tableaux de service comme les désidératas (congés par exemple)
//5 reducers pour cette branche : branche C

export const config = (state={}, action) => {
    switch (action.type) {
        case C.ADD_DESIDERATA:
            return {
                ...state,
                desideratas:desideratas(state.desideratas,action)
            }
        case C.ADD_TASER_ADMIN:
            return {
                ...state,
                taserAdmins:taserAdmins(state.taserAdmins,action)
            }
        case C.REMOVE_DESIDERATA:
            return {
                ...state,
                desideratas:desideratas(state.desideratas,action)
            }
        case C.REMOVE_TASER_ADMIN:
            return {
                ...state,
                taserAdmins:taserAdmins(state.taserAdmins,action)
            }
        default:
            return state
    }
}

export const desideratas = (state=[], action) => {
    switch (action.type) {
        case C.ADD_DESIDERATA:
            return [
                ...state,
                desiderata({},action)
            ]
        case C.REMOVE_DESIDERATA:
            return state.filter(
                d => d.desiderataId !== action.desiderataId
            )
        default:
            return state
    }
}

export const taserAdmins = (state=[], action) => {
    switch (action.type) {
        case C.ADD_TASER_ADMIN:
            return [
                ...state,
                taserAdmin({},action)
            ]
        case C.REMOVE_TASER_ADMIN:
            return state.filter(
                d => d.taserAdminId !== action.taserAdminId
            )
        default:
            return state
    }
}

export const desiderata = (state={}, action) => {
    switch (action.type) {
        case C.ADD_DESIDERATA:
            return {
                desiderataId:action.desiderataId,
                name:action.name,
                color:action.color,
                shortKey:action.shortKey,
            }
        default:
            return state
    }
}

export const taserAdmin = (state={}, action) => {
    switch (action.type) {
        case C.ADD_TASER_ADMIN:
            return {
                taserAdminId:action.taserAdminId,
                pwd:action.pwd,
                taserIdToAdmin:action.taserIdToAdmin,
            }
        default:
            return state
    }
}