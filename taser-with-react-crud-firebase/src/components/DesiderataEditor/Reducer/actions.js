import C from './constants'
import short from 'short-uuid'

export const addDesiderata = (newData) =>
    ({
        type: C.ADD_DESIDERATA,
        id: short().new(),
        name: newData.name,
        isRequired: newData.isRequired,
        nature: newData.nature,
        color: newData.color,
        shortKey: newData.shortKey
    })

export const removeDesiderata = (desiderata) =>
    ({
        type: C.REMOVE_DESIDERATA,
        id: desiderata.id
    })

export const updateDesiderata = (desiderata) =>
    ({
        type: C.UPDATE_DESIDERATA,
        id: desiderata.id,
        name: desiderata.name,
        isRequired: desiderata.isRequired,
        nature: desiderata.nature,
        color: desiderata.color,
        shortKey: desiderata.shortKey
    })

export const initState = (state) =>
    ({
        type: C.INIT_DESIDERATAS,
        state:state
    })