import { db } from "lib/firebase"
//{"name":"Par","id":"1", "desc":"Taser des Pars", "numberOfDays" : "7","numberOfTasers":"3"}
export const getTaserUsers = async (taserId) => {
    const doc = await db.collection("tasers").doc(taserId).get()
    if (doc.exists) {
        console.log("Taser - user found in database")
        const snapshot = await db
            .collection("tasers")
            .doc(taserId)
            .collection("users")
            .get()
        /*let taserUsers = []
        snapshot.forEach((user) => {
            let { name } = user.data()
            taserUsers.push({ id: user.id, name: name })
        })*/
        const taserUsers = snapshot.docs.map((user) =>
            ({ id: user.id, ...user.data() })
        )
        return taserUsers
    } else {
        console.log("Users not found in database")
        //return db.collection("tasers").doc(taserId).
        return []
    }
}

export const createUser = async (taserId, name) => {
    //db.collection("tasers").doc(taserId).set({}).then(
    const res = await db.collection("tasers").doc(taserId).collection("users").add({
        name: name
    })
    return res.id
}

export const deleteUser = async (taserId, userId) => {
    let res = await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .doc(userId)
        .delete()
    return res
}

export const updateUser = async (taserId, userId, name) => {
    let res = await db.collection("tasers").doc(taserId).collection("users").doc(userId).update({
        name: name
    })
    return res
}