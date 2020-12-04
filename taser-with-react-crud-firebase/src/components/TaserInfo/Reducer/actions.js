import C from './constants'

export const setInfo = (newData) =>
    ({
        type: C.SET_INFO,
        id: newData.id,
        name: newData.name,
        adminUid: newData.uid,
        desc: newData.desc,
        numberOfDays: newData.numberOfDays,
        numberOfTasers: newData.numberOfTasers
    })


export const initState = (state) =>
    ({
        type: C.INIT_INFO,
        state:state
    })

export const updateConnected = (connected) =>
    ({
        type: C.UPDATE_CONNECTED,
        connected  : connected
    })

export const initConnected = (connected, adminUid, taserId) =>
    ({
        type: C.INIT_CONNECTED,
        connected  : connected,
        adminUid: adminUid,
        id:taserId
    })