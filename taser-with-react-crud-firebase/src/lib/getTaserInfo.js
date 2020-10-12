import { db } from "lib/firebase"
//{"name":"Par","id":"1", "desc":"Taser des Pars", "numberOfDays" : "7","numberOfTasers":"3"}
export const getTaserInfo = async (taserId) => {
    const doc = await db.collection("tasers").doc(taserId).get()

    if (doc.exists) {
        console.log("Taser found in database")
        const snapshot = await db
            .collection("tasers")
            .doc(doc.id)
            .collection("info")
            .get()

        const taserInfo = snapshot.docs.map((taser) =>
            ({ id: taser.id, ...taser.data() })
        )
        return taserInfo
    } else {
        console.log("Taser not found in database, creating new entry...")
        await db.collection("tasers").doc(taserId).set({}).then(
            db.collection("tasers").doc(taserId).collection("info").doc(taserId).set({
        //await db.collection("tasers").doc(taserId).collection("info").doc(taserId).set({
                id: taserId,
                name: "",
                desc: "",
                numberOfDays: "7",
                numberOfTasers: "4"
            })
        )
        return []
    }
}

export const createInfo = async (taserId, name, desc, numberOfDays,  numberOfTasers) => {
    let res = await db.collection("tasers").doc(taserId).collection("info").doc(taserId).update({
        id: taserId,
        name: name,
        desc: desc,
        numberOfDays: numberOfDays,
        numberOfTasers: numberOfTasers
    })
    return res
}

export const deleteTaser = async (taserId) => {
    let res = await db
        .collection("tasers")
        .doc(taserId)
        .delete();
    return res;
}