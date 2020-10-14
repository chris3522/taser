import { db } from "lib/firebase"

export const getInfo = async (taserId) => {
    const doc = await db.collection("tasers").doc(taserId).collection("info").doc(taserId).get()
    if (doc.exists) {
        console.log("Taser found in database")
        return doc.data()
    } else {
        console.log("Taser not found in database, creating default entry...")
        const batch = db.batch()
        const docRef = db.collection("tasers").doc(taserId)
        batch.set(docRef, {})
        const docRef2 = db.collection("tasers").doc(taserId).collection("info").doc(taserId)
        batch.set(docRef2,
            {
                id: taserId,
                name: "",
                desc: "",
                numberOfDays: "7",
                numberOfTasers: "4"
            }
        )
        // Commit the batch
        await batch.commit()
        const doc = await db.collection("tasers").doc(taserId).collection("info").doc(taserId).get()
        return doc.data() 
    }
}


export const updateInfo = async (taserId,newData) => {
    await db.collection("tasers").doc(taserId).collection("info").doc(taserId).update(newData)
    const taserInfo = await db.collection("tasers").doc(taserId).collection("info").doc(taserId).get()
    return taserInfo.data()
}

export const deleteTaser = async (taserId) => {
    return await db
        .collection("tasers")
        .doc(taserId)
        .delete()
}