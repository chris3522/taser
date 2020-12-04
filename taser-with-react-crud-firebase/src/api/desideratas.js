/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/desideratas'

export const getDesideratas = (...args) => {
    return firestore_api.getDesideratas(...args)
}

export const createDesideratas = ({...args}) => {
    return firestore_api.createDesideratas({...args})
}