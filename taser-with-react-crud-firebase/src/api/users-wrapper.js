import * as firestore_api from './users'
export const wrapGetUsers = (taserId,keys) => {
    console.log(keys)
    return firestore_api.getUsers(taserId)
}