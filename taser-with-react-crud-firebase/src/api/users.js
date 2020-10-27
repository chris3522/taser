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

export const createUser = (taserId, newData) => {
    return firestore_api.createUser(taserId, newData)
}

export const updateUser = (taserId, newUserData) => {
    return firestore_api.updateUser(taserId, newUserData)
}

export const deleteUser = (taserId, userId) => {
    return firestore_api.deleteUser(taserId, userId)
}

