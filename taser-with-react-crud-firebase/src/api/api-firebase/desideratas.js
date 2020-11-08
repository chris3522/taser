import { db } from "lib/firebase"

export const getDesideratas = async (taserId) => {
    const snapshot = await db
        .collection("tasers")
        .doc(taserId)
        .collection("desideratas")
        .get()
    await db
        .collection("tasers")
        .doc(taserId)
        .collection("desideratas")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Desideratas not found" : 'Desideratas found')
        })
    const taserDesideratas = snapshot.docs.map((desiderata) =>
        ({ id: desiderata.id, ...desiderata.data() })
    )

    return taserDesideratas

}

export const createDesiderata = async (taserId, newData) => {
    //add Desiderata and retrieve random id by firestore
    return await db.collection("tasers").doc(taserId).collection("desideratas").add(newData)
        .then(docRef =>
            db.collection("tasers").doc(taserId).collection("desideratas").doc(docRef.id).get())
        .then(desiderata => ({ id: desiderata.id, ...desiderata.data() }))
}

export const updateDesiderata = async (taserId, newDesiderataData) => {
    return await db.collection("tasers")
        .doc(taserId)
        .collection("desideratas")
        .doc(newDesiderataData.id)
        .update(newDesiderataData)
}

export const deleteDesiderata = async (taserId, desiderataId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("desideratas")
        .doc(desiderataId)
        .delete()
}

