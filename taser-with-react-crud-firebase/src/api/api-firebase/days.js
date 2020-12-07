import { db } from "lib/firebase"


/****************************************************************************** */

export const createAllDays = async ({ ...args }) => {
    const { taserId, stateData, year } = args
    await db.collection("tasers").doc(taserId).collection("days").doc(year).set(stateData)
    const doc2 = await db.collection("tasers").doc(taserId).collection("days").doc(year).get()

    return ({ id: doc2.id, ...doc2.data() })
}


export const getYear = async (...args) => {
    const [taserId, currentYear, selectedYear] = args
    const yearId = currentYear === selectedYear ? currentYear : selectedYear
    const yearDoc = await db.collection("tasers").doc(taserId).collection("days").doc(yearId.toString()).get()
    if (yearDoc.exists) {
        console.log("Year found in database")
        return ({ year: yearDoc.id, ...yearDoc.data() })
    } else {
        console.log("Year not found in database, creating default entry")
        const yearDoc1 = await db.collection("tasers").doc(taserId).collection("days").doc(yearId.toString()).set({ [yearId]: [] })
        return ({ year: yearDoc1.id, ...yearDoc1.data() })
    }
}


export const getYearRenfort = async (...args) => {
    const [taserRenforts, currentYear, selectedYear] = args
    const yearId = currentYear === selectedYear ? currentYear : selectedYear
    const promises = []
    taserRenforts.map(taser => {
            const p = db.collection("tasers").doc(taser.taserId).collection("days").doc(yearId.toString()).get()
            return promises.push(p)
        }
    )
    const snapshots = await Promise.all(promises)
    const results = []
    snapshots.forEach(snap => {
            const data = snap.data()
            data.year = snap.id
            results.push(data)
           
    })
    //return results.filter(data=> data.year === "2020")
    if (results.length>0) {
        console.log("Renforts year found in database")
        return results.filter(data=> data.year === "2020")
        } 
    else {
        console.log("Renfort year not found in database")
        return []
    }
}
