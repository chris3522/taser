/************************ ******************/
//Here we can choose which API to be called
//by components
//and switch between differents API
//firestore based API available for now
/************************ ******************/

import * as firestore_api from './api-firebase/desideratas'

export const getDesideratas = (taserId,keys) => {
    //console.log(keys)
    //firestore_api.getDesideratas(taserId).then(result => console.log(result))
    return firestore_api.getDesideratas(taserId)
}

export const createDesiderata = (taserId, newData) => {
    return firestore_api.createDesiderata(taserId, newData)
}

export const updateDesiderata = (taserId, newDesiderataData) => {
    return firestore_api.updateDesiderata(taserId, newDesiderataData)
}

export const deleteDesiderata = (taserId, desiderataId) => {
    return firestore_api.updateDesiderata(taserId, desiderataId)
}