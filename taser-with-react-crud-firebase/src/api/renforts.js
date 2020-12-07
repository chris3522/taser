/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/renforts'


export const getRenforts = (...args) => {
    return firestore_api.getRenforts(...args)
}

export const createRenforts = ({...args}) => {
    return firestore_api.createRenforts({...args})
}