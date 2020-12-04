import { db } from "lib/firebase"

export const getDesideratas = async (...args) => {
    try {
        const [taserId] = args
        const desideratasDoc = await db.collection("tasers").doc(taserId).collection("desideratas").doc("desideratas").get()
        if (desideratasDoc.exists) {
            console.log("Desideratas found in database")
            return ({ ...desideratasDoc.data() })
        } else {
            console.log("Desideratas not found in database, creating default entry")
            await db.collection("tasers").doc(taserId).collection("desideratas").doc("desideratas").set({ desideratas: [] })
            return ({ desideratas: [] })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createDesideratas = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("desideratas").doc("desideratas").set(stateData)
}

