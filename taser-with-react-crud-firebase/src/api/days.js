/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/days'

export const createDay = (...args) => {
    return firestore_api.createDay(...args)
}