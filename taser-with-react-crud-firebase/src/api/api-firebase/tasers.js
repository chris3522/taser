import { db } from "lib/firebase"

export const getTasers = async () => {
    try {
        const snapshot = await db
            .collection("tasers")
            .get()

        const tasers = await Promise.all(snapshot.docs.map(taser => 
                db.collection("tasers").doc(taser.id).collection("info").doc("info").get()
                )   
        )
        const tasers2 = await Promise.all(tasers.map (doc => ({...doc.data().info})))
        return tasers2
    }
    catch (error) {
        console.error(error)
    }

}





