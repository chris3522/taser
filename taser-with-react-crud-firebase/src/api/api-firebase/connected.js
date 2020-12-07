import { db } from "lib/firebase"

export const getConnected = async (...args) => {
    try {
        const [taserId] = args
        const connectedDoc = await db.collection("tasers").doc(taserId).collection("connected").doc("admin").get()
        if (connectedDoc.exists) {
            console.log("Connected found in database")
            return ({ ...connectedDoc.data() })
        } else {
            console.log("Connected not found in database, return default entry")
            await db.collection("tasers").doc(taserId).collection("connected").doc("admin").set({ connected: {} })
            return ({ connected: {} })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createConnected = async ({ ...args }) => {
    const { taserId, stateData } = args
    await db.collection("tasers").doc(taserId).collection("connected").doc("admin").set(stateData)
    return stateData
}
