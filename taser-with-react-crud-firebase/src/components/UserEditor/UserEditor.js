import React, { useEffect, useRef, useState, useReducer } from "react"
import useSWR, { mutate } from "swr"
import { navigate } from "@reach/router"
import "./UserEditor.css"
import * as api_root from "../../api/users"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'

import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'


const UserEditor = ({ user, taserId, className }) => {
    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    /*********************define users state  *********************** */
    const [isDisplay, setIsDisplay] = useState(true)
    const [users, dispatchUsers] = useReducer(reducers.users,[])

    /***********************init users state************************* */
    const swrKey2 = `/admin/${taserId}/users2` 
    const { data: dataUsers, error: errorUsers, mutate: mutateUsers } = useSWR([taserId, swrKey2], api_root.getUsers2)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        console.log(dataUsers)
        !firstInit && dataUsers && dispatchUsers(actions.initState(dataUsers.users))
    }, [dataUsers])

    /******************update state with new users******************** */
    useEffect(() => {
        let stateData = {users : users}
        if(users.length>0 && firstInit){
            api_root.createUsers({taserId,stateData})
            mutateUsers(stateData, false)
        }
        return () => {stateData = {}}
    }, [users, firstInit])

    const inputUserName = useRef(null)
    const inputUserId = useRef(null)
    const inputModalUserName = useRef(null)
    const inputModalUserId = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name": inputUserName.current.value,
            }
            if (!firstInit) {setFirstInit(true)}
            dispatchUsers(actions.addUser(newData))     
        }
    }

    const displayUpdateUserForm = (e, taserId, userId, userName) => {
        e.preventDefault()
        inputModalUserId.current.value = userId
        inputModalUserName.current.value = userName
        setIsDisplay(false)
    }

    const updateUser = (e) => {
        e.preventDefault()
        const newUserData = {
            "id":inputModalUserId.current.value,
            "name": inputModalUserName.current.value
        }
        if (!firstInit) {setFirstInit(true)}
        dispatchUsers(actions.updateUser(newUserData)) 

        inputModalUserId.current.value = ""
        inputModalUserName.current.value = ""
        setIsDisplay(true)
    }

    if (errorUsers) return <p>Error loading data!</p>
    else if (!dataUsers) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputUserId} inputRef2={inputUserName} />
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateUser} inputRef1={inputModalUserId} inputRef2={inputModalUserName} />
                <table>
                    <thead><tr><th>id</th><th>nom</th><th></th><th></th></tr></thead>
                    <tbody>
                        {dataUsers.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td> {user.id}</td><td>{user.name}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateUserForm(e, taserId, user.id, user.name)
                                            }}

                                        /></td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            if (!firstInit) {setFirstInit(true)}
                                            dispatchUsers(actions.removeUser(user)) 
                                        }}
                                    /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default UserEditor