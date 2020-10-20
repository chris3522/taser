import { db } from "lib/firebase"

export const getVacations = async (taserId) => {
    const snapshot = await db
        .collection("tasers")
        .doc(taserId)
        .collection("vacations")
        .get()
    const snapshot2 = await db
        .collection("tasers")
        .doc(taserId)
        .collection("vacations")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Vacations not found" : 'Vacations found')
        })
    const taserVacations = snapshot.docs.map((vacations) =>
        ({ id: vacations.id, ...vacations.data() })
    )

    return taserVacations

}

export const createVacation = async (taserId, newData) => {
    //add user and retrieve random id by firestore
    return await db.collection("tasers").doc(taserId).collection("vacations").add(newData)
        .then(docRef =>
            db.collection("tasers").doc(taserId).collection("vacations").doc(docRef.id).get())
        .then(vacation => ({ id:vacation.id, ...vacation.data() }))
}

export const updateVacation = async (taserId, newVacationData) => {
    return await db.collection("tasers")
        .doc(taserId)
        .collection("vacations")
        .doc(newVacationData.id)
        .update(newVacationData)
}

export const deleteVacation = async (taserId, vacationId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("vacations")
        .doc(vacationId)
        .delete()
}