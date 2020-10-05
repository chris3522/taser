import { db } from "lib/firebase"
//{"name":"Par","auth":true,"id":"1", "desc":"Taser des Pars", "numberOfDays" : "7","numberOfTasers":"3"}
export const getTaserInfo = async (taserId) => {
  const doc = await db.collection("tasers").doc(taserId).get()

  if (doc.exists) {
    console.log("Taser found in database")
    const snapshot = await db
      .collection("tasers")
      .doc(doc.id)
      .collection("info")
      .get()

    let taserInfo = []
    snapshot.forEach((info) => {
      let { name, desc, numberOfDays, numberOfTasers } = info.data()
      taserInfo.push({ id: info.id, name: name, desc: desc, numberOfDays: numberOfDays, numberOfTasers: numberOfTasers })
    })
    return taserInfo
  } else {
    console.log("Taser not found in database, creating new entry...")
    db.collection("tasers").doc(taserId).set({})
    return []
  }
}

export const createInfo = async (taserId, taserName) => {
  let res = await db.collection("tasers").doc(taserId).collection("info").add({
    name: taserName,
    desc: "",
    numberOfDays: "7", 
    numberOfTasers: "4"
  })
  return res
}