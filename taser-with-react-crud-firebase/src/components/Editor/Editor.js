import React, { useEffect, useRef, useState, useCallback } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import "./Editor.css"
import * as crudTaser from "../../lib/getTaserUsers"
import * as h from "../../lib/helpers"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'

//A faire revoir les clés de useSWR
//pourquoi enlever taserId de displayUpdateUserForm enleve la mise à jour auto
const Editor = ({ user, taserId, className }) => {
    const [isDisplay, setIsDisplay] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])
    //const swrUserKey = `${taserId}-Users`
    const { data, error } = useSWR([taserId,"users"], crudTaser.getTaserUsers)

    const inputUserName = useRef(null)
    const inputUserId = useRef(null)
    const inputModalUserName = useRef(null)
    const inputModalUserId = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const id = crudTaser.createUser(
                taserId,
                inputUserName.current.value
            )
            mutate([taserId,"users"])
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
        crudTaser.updateUser(taserId, inputModalUserId.current.value, inputModalUserName.current.value).then(
            mutate([taserId,"users"])
        )
        inputModalUserId.current.value = ""
        inputModalUserName.current.value = ""
        setIsDisplay(true)
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputUserId} inputRef2={inputUserName} />
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateUser} inputRef1={inputModalUserId} inputRef2={inputModalUserName}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th></th><th></th></tr></thead>
                    <tbody>
                        {data.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td> {user.id}</td><td>{user.name}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateUserForm(e, taserId,  user.id, user.name)
                                            }}

                                        /></td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            crudTaser.deleteUser(taserId, user.id).then(() => mutate([taserId,"users"]))
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

export default Editor