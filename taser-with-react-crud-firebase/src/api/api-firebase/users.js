import { db } from "lib/firebase"

export const getUsers = async (...args) => {
    try {
        const [taserId] = args
        const usersDoc = await db.collection("tasers").doc(taserId).collection("users").doc("users").get()
        if (usersDoc.exists) {
            console.log("Users found in database")
            return ({ ...usersDoc.data() })
        } else {
            console.log("Users not found in database, creating default entry")
            await db.collection("tasers").doc(taserId).collection("users").doc("users").set({ users: [] })
            return ({ users: [] })
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createUsers = async ({ ...args }) => {
    const { taserId, stateData } = args
    return await db.collection("tasers").doc(taserId).collection("users").doc("users").set(stateData)
}