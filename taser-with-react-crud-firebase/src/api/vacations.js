/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/vacations'

export const getVacations = (taserId,keys) => {
    //console.log(keys)
    //firestore_api.getUsers(taserId).then(result => console.log(result))
    return firestore_api.getVacations(taserId)
}

export const createVacation = (taserId, newData) => {
    return firestore_api.createVacation(taserId, newData)
}

export const updateVacation = (taserId, newVacationData) => {
    return firestore_api.updateVacation(taserId, newVacationData)
}

export const deleteVacation = (taserId, vacationId) => {
    return firestore_api.deleteVacation(taserId, vacationId)
}