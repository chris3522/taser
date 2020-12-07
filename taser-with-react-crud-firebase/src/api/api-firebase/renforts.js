import { db } from "lib/firebase"

export const getRenforts = async (...args) => {
    try {
        const [taserId] = args
        const renfortsDoc = await db.collection("tasers").doc(taserId).collection("renforts").doc("renforts").get()
        if (renfortsDoc.exists) {
            console.log("Renforts found in database")
            return ({ ...renfortsDoc.data() })
        } else {
            console.log("Renforts not found in database, creating default entry")
            await db.collection("tasers").doc(taserId).collection("renforts").doc("renforts").set({ renforts: [] })
            return ({ renforts: [] })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createRenforts = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("renforts").doc("renforts").set(stateData)
}