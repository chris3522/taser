/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/renforts'

export const getRenforts = (taserId,keys) => {
    //console.log(keys)
    //firestore_api.getUsers(taserId).then(result => console.log(result))
    return firestore_api.getRenforts(taserId)
}

export const createTaserRenfort = (taserId, newData) => {
    return firestore_api.createTaserRenfort(taserId, newData)
}

export const deleteTaserRenfort = (taserId, renfortId) => {
   return firestore_api.deleteTaserRenfort(taserId, renfortId)
}

