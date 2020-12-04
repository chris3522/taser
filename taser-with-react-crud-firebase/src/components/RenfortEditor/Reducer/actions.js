import C from './constants'
import short from 'short-uuid'

export const addRTaser = (newData) =>
    ({
        type: C.ADD_RTASER,
        id: short().new(),
        name: newData.name,
    })

export const removeRTaser = (rTaser) =>
    ({
        type: C.REMOVE_RTASER,
        id: rTaser.id
    })

export const updateRTaser = (rTaser) =>
    ({
        type: C.UPDATE_RATSER,
        id: rTaser.id,
        name: rTaser.name,
    })

export const initState = (state) =>
    ({
        type: C.INIT_RTASERS,
        state:state
    })