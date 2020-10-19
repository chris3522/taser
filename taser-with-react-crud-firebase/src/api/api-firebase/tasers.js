import { db } from "lib/firebase"

export const getTasers = async () => {
    const snapshot = await db
        .collection("tasers")
        .get()
    const snapshot2 = await db
        .collection("tasers")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Tasers not found" : 'Tasers found')
        })
    const tasers = await Promise.all(snapshot.docs.map(taser => 
            db.collection("tasers").doc(taser.id).collection("info").doc(taser.id).get()
            //.then(doc => doc.data())
            )   
    )
    const tasers2 = await Promise.all(tasers.map (doc => ({...doc.data()})))
    return tasers2

}




