/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/users'

export const getUsers = (taserId,keys) => {
    //console.log(keys)
    //firestore_api.getUsers(taserId).then(result => console.log(result))
    return firestore_api.getUsers(taserId)
}

/*********************************** */

export const getUsers2 = (...args) => {
    return firestore_api.getUsers2(...args)
}

export const createUsers = ({...args}) => {
    return firestore_api.createUsers({...args})
}