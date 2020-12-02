import { db } from "lib/firebase"

export const getUsers = async (taserId) => {
    const snapshot = await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .get()
    await db
        .collection("tasers")
        .doc(taserId)
        .collection("users")
        .limit(1).get().then(query => {
            console.log(query.size === 0 ? "Users not found" : 'Users found')
        })
    const taserUsers = snapshot.docs.map((user) =>
        ({ id: user.id, ...user.data() })
    )
    return taserUsers

}


/**************************New request strategy********************************* */
export const getUsers2 = async (...args) => {
    try {
        const [taserId] = args
        const usersDoc = await db.collection("tasers").doc(taserId).collection("users2").doc("users").get()
        if (usersDoc.exists) {
            console.log("Users found in database")
            return ({ ...usersDoc.data() })
        } else {
            console.log("Users not found in database, creating default entry")
            await db.collection("tasers").doc(taserId).collection("users2").doc("users").set({ users: [] })
            return ({ users: [] })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createUsers = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("users2").doc("users").set(stateData)
}