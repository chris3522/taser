/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/tasers'

export const getTasers = (keys) => {
    return firestore_api.getTasers()
}

export const getTasers2 = (keys) => {
    return firestore_api.getTasers2()
}

