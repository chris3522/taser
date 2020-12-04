/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/vacations'

export const getVacations = (...args) => {
    return firestore_api.getVacations(...args)
}

export const createVacations = ({...args}) => {
    return firestore_api.createVacations({...args})
}

export const getIsrequiredVacationsNumber = (...args) => {
    return firestore_api.getIsrequiredVacationsNumber(...args)
}
