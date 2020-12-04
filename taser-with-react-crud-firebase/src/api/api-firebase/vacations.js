import { db } from "lib/firebase"


export const getVacations = async (...args) => {
    try {
        const [taserId] = args
        const vacationsDoc = await db.collection("tasers").doc(taserId).collection("vacations").doc("vacations").get()
        if (vacationsDoc.exists) {
            console.log("Vacations found in database")
            return ({ ...vacationsDoc.data() })
        } else {
            console.log("Vacations not found in database, creating default entry")
            await db.collection("tasers").doc(taserId).collection("vacations").doc("vacations").set({ vacations: [] })
            return ({ vacations: [] })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createVacations = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("vacations").doc("vacations").set(stateData)
}

export const getIsrequiredVacationsNumber = async (...args) => {
    const [taserId] = args
    const vacationsRequiredRef = await db.collection("tasers").doc(taserId).collection("vacations")
        .where("isRequired", "==", "required")
    const snapshot = await vacationsRequiredRef.get()
    if (snapshot.empty) {
        console.log('No matching documents.');
        return
    }
    const vacationsRequired = {targetVacationsRequiredNumber : snapshot.docs.length, targetVacationsName : snapshot.docs.map(vacation => vacation.data().name)}
    return vacationsRequired
}