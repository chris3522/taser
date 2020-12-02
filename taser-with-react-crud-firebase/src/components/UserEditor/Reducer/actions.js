import C from './constants'
import short from 'short-uuid'

export const addUser = (newData) =>
    ({
        type: C.ADD_USER,
        id: short().new(),
        name: newData.name,
    })

export const removeUser = (user) =>
    ({
        type: C.REMOVE_USER,
        id: user.id
    })

export const updateUser = (user) =>
    ({
        type: C.UPDATE_USER,
        id: user.id,
        name: user.name,
    })

export const initState = (state) =>
    ({
        type: C.INIT_USERS,
        state:state
    })