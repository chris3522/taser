/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/users'

export const getUsers = (...args) => {
    return firestore_api.getUsers(...args)
}

export const createUsers = ({...args}) => {
    return firestore_api.createUsers({...args})
}