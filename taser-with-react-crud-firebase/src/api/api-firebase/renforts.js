import { db } from "lib/firebase"

export const getRenforts = async (taserId) => {
    const snapshot = await db
        .collection("tasers")
        .doc(taserId)
        .collection("renforts")
        .get()
    await db
        .collection("tasers")
        .doc(taserId)
        .collection("renforts")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Renforts not found" : 'Renforts found')
        })
    const taserRenforts = snapshot.docs.map((renfort) =>
        ({ id: renfort.id, ...renfort.data() })
    )
    return taserRenforts

}

export const createTaserRenfort = async (taserId, newData) => {
    //add user and retrieve random id by firestore
    return await db.collection("tasers").doc(taserId).collection("renforts").add(newData)
        .then(docRef =>
            db.collection("tasers").doc(taserId).collection("renforts").doc(docRef.id).get())
        .then(renfort => ({ id: renfort.id, ...renfort.data() }))
}

export const deleteTaserRenfort = async (taserId, taserRenfortId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("renforts")
        .doc(taserRenfortId)
        .delete()
}

