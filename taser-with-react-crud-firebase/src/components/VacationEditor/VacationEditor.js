import React, { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { navigate, Link } from "@reach/router"
import "./VacationEditor.css"
import * as api_root from "../../api/vacations"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'

const VacationEditor = ({ user, taserId, className }) => {
    const [isDisplay, setIsDisplay] = useState(true)

    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    const swrKey = `/admin/${taserId}/vacations`
    const { data, error } = useSWR([taserId, swrKey], api_root.getVacations)
   
    const inputVacationName = useRef(null)
    const inputVacationShortKey = useRef(null)
    const inputVacationId = useRef(null)
    const inputModalVacationName = useRef(null)
    const inputModalVacationShortKey = useRef(null)
    const inputModalVacationId = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name": inputVacationName.current.value,
                "shortKey": inputVacationShortKey.current.value,
            }
            api_root.createVacation(taserId, newData)
                .then(() => mutate([taserId, swrKey]))
        }
    }

    const displayUpdateVacationForm = (e, taserId, vacationId, vacationName, vacationShortKey) => {
        e.preventDefault()
        inputModalVacationId.current.value = vacationId
        inputModalVacationName.current.value = vacationName
        inputModalVacationShortKey.current.value = vacationShortKey
        setIsDisplay(false)
    }

    const updateVacation = (e) => {
        e.preventDefault()
        const newVacationData = {
            "id":inputModalVacationId.current.value,
            "name": inputModalVacationName.current.value,
            "shortKey": inputModalVacationShortKey.current.value
        }
        api_root.updateVacation(taserId, newVacationData).then(
            mutate([taserId, swrKey])
        )
        inputModalVacationId.current.value = ""
        inputModalVacationName.current.value = ""
        inputModalVacationShortKey.current.value = ""
        setIsDisplay(true)
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputVacationId} inputRef2={inputVacationName} inputRef3={inputVacationShortKey}/>
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateVacation} inputRef1={inputModalVacationId} inputRef2={inputModalVacationName} inputRef3={inputModalVacationShortKey}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th>shortKey</th><th></th><th></th></tr></thead>
                    <tbody>
                        {data.map((vacation) => {
                            return (
                                <tr key={vacation.id}>
                                    <td> {vacation.id}</td><td>{vacation.name}</td><td>{vacation.shortKey}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateVacationForm(e, taserId, vacation.id, vacation.name, vacation.shortKey)
                                            }}

                                        /></td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            api_root.deleteVacation(taserId, vacation.id).then(() => mutate([taserId, swrKey]))
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

export default VacationEditor