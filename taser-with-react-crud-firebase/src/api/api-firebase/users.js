import { db } from "lib/firebase"

export const getUsers = async (taserId) => {
    const snapshot = await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .get()
    const snapshot2 = await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Users not found" : 'Users found')
        })
    const taserUsers = snapshot.docs.map((user) =>
        ({ id: user.id, ...user.data() })
    )

    return taserUsers

}

export const createUser = async (taserId, newData) => {
    //add user and retrieve random id by firestore
    return await db.collection("tasers").doc(taserId).collection("users").add(newData)
        .then(docRef =>
            db.collection("tasers").doc(taserId).collection("users").doc(docRef.id).get())
        .then(user => ({ id: user.id, ...user.data() }))
}

export const updateUser = async (taserId, newUserData) => {
    return await db.collection("tasers")
        .doc(taserId)
        .collection("users")
        .doc(newUserData.id)
        .update(newUserData)
}

export const deleteUser = async (taserId, userId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .doc(userId)
        .delete()
}

