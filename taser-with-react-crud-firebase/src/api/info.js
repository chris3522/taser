/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/info'

export const getInfo = (taserId,keys) => {
    //console.log(keys)
    //firestore_api.getInfo(taserId).then(result => console.log(result))
    return firestore_api.getInfo(taserId)
}

export const updateInfo = (taserId, newData) => {
    return firestore_api.updateInfo(taserId, newData)
}

export const deleteTaser = (taserId) => {
    return firestore_api.deleteTaser(taserId)
}