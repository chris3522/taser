import { db } from "lib/firebase"

export const getTasers = async () => {
    const snapshot = await db
        .collection("tasers")
        .get()
    await db
        .collection("tasers")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Tasers not found" : 'Tasers found')
        })
    console.log("from cache?")
    console.log(snapshot.metadata.fromCache)
    const tasers = await Promise.all(snapshot.docs.map(taser => 
            db.collection("tasers").doc(taser.id).collection("info").doc(taser.id).get()
            //.then(doc => doc.data())
            )   
    )
    const tasers2 = await Promise.all(tasers.map (doc => ({...doc.data()})))
    return tasers2

}




