import { db } from "lib/firebase"

export const getInfo = async (...args) => {
    try {
        const [taserId, uid] = args
        const doc = await db.collection("tasers").doc(taserId).collection("info").doc("info").get()
        if (doc.exists) {
            console.log("Taser found in database")
            return doc.data()
        } else {
            console.log("Taser not found in database, creating default entry...")
            const batch = db.batch()
            const docRef = db.collection("tasers").doc(taserId)
            batch.set(docRef, {})
            const docRef2 = db.collection("tasers").doc(taserId).collection("info").doc("info")
            const docRef3 = db.collection("tasers").doc(taserId).collection("connected").doc("admin")
            batch.set(docRef2,
                {
                    info: {
                        id: taserId,
                        name: "",
                        desc: "",
                        numberOfDays: "7",
                        numberOfTasers: "4",
                        adminUid: uid
                    }
                }
            )
            batch.set(docRef3,
                {
                    connected: {
                        id: taserId,
                        adminUid: uid,
                        connected: true
                    }
                }
            )
            // Commit the batch
            await batch.commit()
            const doc = await db.collection("tasers").doc(taserId).collection("info").doc("info").get()
            return doc.data()
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createInfo = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("info").doc("info").set(stateData)
}

export const getInfoOnly = async (taserId) => {
    const doc = await db.collection("tasers").doc(taserId).collection("info").doc("info").get()
    if (doc.exists) {
        console.log("Taser not found in database")
        return doc.data()
    } else {
        throw new Error('No such document!')
    }
}


/******************** */


export const deleteTaser = async (taserId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .delete()
}


