/*****SDK to call Django Rest API******** */
import axios from 'axios'
import django_api from './url'

export const getUsers = async (...args) => {
    try {
        const [taserId] = args
        const usersDoc = await axios.get(django_api.url)
        return ({ users: JSON.parse(usersDoc.data.users) })
        /*   const usersDoc = await ...
           if (usersDoc.exists) {
               console.log("Users found in database")
               return ({ ...usersDoc.data() })
           } else {
               console.log("Users not found in database, creating default entry")
               await ...
               return ({ users: [] })
           }*/
    }
    catch (error) {
        console.error(error)
    }
}