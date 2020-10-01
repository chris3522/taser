import C from './constants-c'
import { v4 } from 'uuid'

// 4 action creators

// Action type ADD_DESIDERATA :
export const addDesiderataType = (name,color,shortKey) =>
    ({
        type: C.ADD_DESIDERATA,
        desiderataId:v4(),
        name,
        color,
        shortKey:shortKey.toLowerCase()
    })

// Action type ADD_TASER_ADMIN :
export const addATaserAdmin = (taserIdToAdmin,pwd) =>
    ({
        type: C.ADD_TASER_ADMIN,
        taserAdminId:v4(),
        pwd,
        taserIdToAdmin
    })

// Action type REMOVE_DESIDERATA :
export const removeDesiderata = (desiderataId) =>
    ({
        type: C.REMOVE_DESIDERATA,
        desiderataId
    })

// Action type REMOVE_TASER_ADMIN :
export const removeATaserAdmin = (taserAdminId) =>
    ({
        type: C.REMOVE_TASER_ADMIN,
        taserAdminId
    })