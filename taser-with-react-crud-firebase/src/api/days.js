/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/days'

export const createDay = ({...args}) => {
    return firestore_api.createDay({...args})
}

export const createAllDays = ({...args}) => {
    return firestore_api.createAllDays({...args})
}

export const getDays = (...args) => {
    return firestore_api.getDays(...args)
}

export const getYear = (...args) => {
    return firestore_api.getYear(...args)
}

export const deleteDay = (...args) => {
    return firestore_api.deleteDay(...args)
}

export const getRenfortDays = (...args) => {
    return firestore_api.getRenfortDays(...args)
}

export const getUsersDays = (...args) => {
    return firestore_api.getUsersDays(...args)
}