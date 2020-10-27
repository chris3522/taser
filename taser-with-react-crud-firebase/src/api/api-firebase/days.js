import { db } from "lib/firebase"

export const createDay = async (...args) => {
    const [taserId, year, newData] = args
    //add user and retrieve random id by firestore
    return await db.collection("tasers").doc(taserId).collection("users").doc(year).collection("days").add(newData)
        .then(docRef =>
            db.collection("tasers").doc(taserId).collection("users").doc(year).collection("days").doc(docRef.id).get())
        .then(day => ({ id:day.id, ...day.data() }))
}