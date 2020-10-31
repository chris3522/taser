/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/info'

export const getInfo = (...args) => {
    //console.log(keys)
    //firestore_api.getInfo(taserId).then(result => console.log(result))
    //create default ifo if not exist
    return firestore_api.getInfo(...args)
}

export const updateInfo = (taserId, newData) => {
    return firestore_api.updateInfo(taserId, newData)
}

export const deleteTaser = (taserId) => {
    return firestore_api.deleteTaser(taserId)
}

export const getInfoOnly = (taserId) => {
    //don't create defaut info
    return firestore_api.getInfoOnly(taserId)
}

export const getConnectedAdmin = (taserId) => {
    return firestore_api.getConnectedAdmin(taserId)
}

export const updateConnectedAdmin = (taserId, newData) => {
    return firestore_api.updateConnectedAdmin(taserId, newData)
}