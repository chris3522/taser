/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/days'

export const createAllDays = ({...args}) => {
    return firestore_api.createAllDays({...args})
}

export const getYear = (...args) => {
    return firestore_api.getYear(...args)
}

export const getYearRenfort = (...args) => {
    return firestore_api.getYearRenfort(...args)
}
