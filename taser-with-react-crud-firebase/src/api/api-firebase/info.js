import { db } from "lib/firebase"

export const getInfo = async (...args) => {
    const  [taserId , uid ]  = args
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
        const docRef3 = db.collection("tasers").doc(taserId).collection("connected").doc("admin")
        batch.set(docRef2,
            {
                id: taserId,
                name: "",
                desc: "",
                numberOfDays: "7",
                numberOfTasers: "4",
                adminUid : uid
            }
        )
        batch.set(docRef3,
            {
                id: taserId,
                adminUid : uid,
                connected:true
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


export const getInfoOnly = async (taserId) => { 
    const doc = await db.collection("tasers").doc(taserId).collection("info").doc(taserId).get()
    if (doc.exists) {
        console.log("Taser not found in database")
        return doc.data()
    } else {
        throw new Error('No such document!')
    }
}

export const getConnectedAdmin = async (taserId) => { 
    const doc = await db.collection("tasers").doc(taserId).collection("connected").doc("admin").get()
    if (doc.exists) {
        console.log("Admin not found in database")
        return doc.data()
    } else {
        throw new Error('No such document!')
    }
}

export const updateConnectedAdmin = async (taserId,newData) => {
    await db.collection("tasers").doc(taserId).collection("connected").doc("admin").update(newData)
    const taserConnectedAdmin = await db.collection("tasers").doc(taserId).collection("connected").doc("admin").get()
     if (taserConnectedAdmin.exists) {
    return taserConnectedAdmin.data()
     }
}