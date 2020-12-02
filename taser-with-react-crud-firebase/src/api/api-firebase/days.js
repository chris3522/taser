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
        //return []
    }
}


/************************************************************ */
export const getDays = async (...args) => {
    const [taserId, userId, rangeOfDaysInt] = args
    const daysRef = await db.collection("tasers").doc(taserId).collection("users").doc(userId).collection("days")
    const snapshot = await daysRef.where('dayNumber', '>', rangeOfDaysInt).get()
    console.log("from cache?")
    console.log(snapshot.metadata.fromCache)
    if (snapshot.empty) {
        console.log('No matching documents.');
        return
    }

    const userDays = snapshot.docs.map((day) =>
        ({ id: day.id, ...day.data() })
    )

    return userDays
}

export const deleteDay = async ({ ...args }) => {
    const { taserId, userId, dayNumber } = args
    return await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .doc(userId)
        .collection("days")
        .doc(dayNumber.toString())
        .delete()
}

export const getRenfortDays = async (...args) => {
    const [taserRenfortId, userId, rangeOfDaysInt] = args
    const usersRef = await db.collection("tasers").doc(taserRenfortId).collection("users").get()
    //const users = await usersRef.docs.map(user => ({id:user.id, ...user.data()}))

    const users2 = await Promise.all(usersRef.docs.map(user =>
        db.collection("tasers").doc(taserRenfortId).collection("users").doc(user.id).collection("days").where('dayNumber', '>', rangeOfDaysInt).get()
        //.then(doc => doc.data())
    )
    )
    const users3 = await Promise.all(users2.map(snap => snap.docs.map(doc => doc.data())))
    const reducer = (acc, obj) => {
        let dayNumber = obj["dayNumber"]
        let vacName = obj["name"]
        if (!acc[dayNumber]) {
            acc[dayNumber] = [];
        }
        acc[dayNumber].push(vacName)
        return (acc)
    }
    const users4 = users3.map(user => user.filter(day => day.isRequired === "renfort"))
    const users5 = users4.reduce((acc, val) => acc.concat(val), []);
    const users6 = users5.reduce(reducer, {})
    const users7 = Object.entries(users6).map(entry => ({ "dayNumber": entry[0], "name": entry[1] }))
    const users8 = users7.map(day => ({ "dayNumber": Number(day.dayNumber), "name": day.name[userId], nature: "vacation", color: "", "userId": userId, "isRequired": "renfort" }))
        .filter(day => day.name !== undefined)
    return users8
}

export const getUsersDays = async (...args) => {
    const [taserId, rangeOfDaysInt] = args
    const snapshot = await db.collection("tasers").doc(taserId).collection("users").get()
    console.log("users from cache?")
    console.log(snapshot.metadata.fromCache)
    const usersDays = await Promise.all(snapshot.docs.map(user =>
        db.collection("tasers").doc(taserId).collection("users").doc(user.id).collection("days").where('dayNumber', '>', rangeOfDaysInt).get()
        //.then(doc => doc.data())
    )
    )
    const usersDays2 = await Promise.all(usersDays.map(snap => snap.docs.map(doc => doc.data())))

    console.log(usersDays2)
    return usersDays2

}