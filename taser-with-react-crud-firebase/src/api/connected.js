/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/connected'

export const getConnected = (...args) => {
    return firestore_api.getConnected(...args)
}

export const createConnected = ({...args}) => {
    return firestore_api.createConnected({...args})
}