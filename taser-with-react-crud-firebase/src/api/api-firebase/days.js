import { db } from "lib/firebase"

export const createDay = async ({...args}) => {
    const {taserId, userId, newData} = args
    const doc = await db.collection("tasers").doc(taserId).collection("users").doc(userId).collection("days").doc(newData.dayNumber.toString()).set(newData)
    const doc2 = await db.collection("tasers").doc(taserId).collection("users").doc(userId).collection("days").doc(newData.dayNumber.toString()).get()
    return ({id:doc2.id, ...doc2.data()})
}

export const getDays = async (...args) => {
    const [taserId, userId, rangeOfDaysInt] = args
    const daysRef = await db.collection("tasers").doc(taserId).collection("users").doc(userId).collection("days")
    const snapshot = await daysRef.where('dayNumber', '>', rangeOfDaysInt).get()
    if (snapshot.empty) {
    console.log('No matching documents.');
    return
    }

    const userDays = snapshot.docs.map((day) =>
        ({ id: day.id, ...day.data() })
    )
    
    return userDays
}

export const deleteDay = async ({...args}) => {
    const {taserId, userId, dayNumber}=args
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .doc(userId)
        .collection("days")
        .doc(dayNumber.toString())
        .delete()
}