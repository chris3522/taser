import React, { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"
import { navigate } from "@reach/router"
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
    const inputVacationNature = useRef("vacation")
    const inputVacationRequise = useRef(null)
    const inputModalVacationName = useRef(null)
    const inputModalVacationShortKey = useRef(null)
    const inputModalVacationId = useRef(null)
    const inputModalVacationNature = useRef("vacation")
    const inputModalVacationRequise = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = {
                "name": inputVacationName.current.value,
                "shortKey": inputVacationShortKey.current.value,
                "nature": inputVacationNature.current.value,
                "isRequired": inputVacationRequise.current.value,
                "color":""
            }
            api_root.createVacation(taserId, newData)
                .then(() => mutate([taserId, swrKey]))
        }
    }

    const displayUpdateVacationForm = (e, taserId, vacationId, vacationNature, vacationName, vacationShortKey, vacationRequired) => {
        e.preventDefault()
        inputModalVacationId.current.value = vacationId
        inputModalVacationName.current.value = vacationName
        inputModalVacationShortKey.current.value = vacationShortKey
        inputModalVacationNature.current.value = vacationNature
        inputModalVacationRequise.current.value = vacationRequired
        setIsDisplay(false)
    }

    const updateVacation = (e) => {
        e.preventDefault()
        const newVacationData = {
            "id":inputModalVacationId.current.value,
            "name": inputModalVacationName.current.value,
            "shortKey": inputModalVacationShortKey.current.value,
            "nature": inputModalVacationNature.current.value,
            "isRequired": inputModalVacationRequise.current.value,
            "color":""
        }
        api_root.updateVacation(taserId, newVacationData).then(
            mutate([taserId, swrKey])
        )
       /* api_root.updateVacation(taserId, newVacationData)
        mutate([taserId, swrKey],data.map(vacation => {
            vacation = vacation.id === newVacationData.id ?  newVacationData : vacation
            return vacation
            })
        )*/
        inputModalVacationId.current.value = ""
        inputModalVacationName.current.value = ""
        inputModalVacationShortKey.current.value = ""
        inputModalVacationNature.current.value = ""
        inputModalVacationRequise.current.value = ""
        setIsDisplay(true)
    }

    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputVacationId} inputRef2={inputVacationNature} inputRef3={inputVacationName} inputRef4={inputVacationShortKey} inputRef5={inputVacationRequise}/>
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateVacation} inputRef1={inputModalVacationId} inputRef2={inputModalVacationNature} inputRef3={inputModalVacationName} inputRef4={inputModalVacationShortKey} inputRef5={inputModalVacationRequise}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th>shortKey</th><th>obligatoire</th><th></th><th></th></tr></thead>
                    <tbody>
                        {data.map((vacation) => {
                            return (
                                <tr key={vacation.id}>
                                    <td> {vacation.id}</td><td>{vacation.name}</td><td>{vacation.shortKey}</td><td>{vacation.isRequired}</td>
                                    <td>
                                        <Icon
                                            name="edit"
                                            theme="light"
                                            size="small"
                                            onClick={(e) => {
                                                displayUpdateVacationForm(e, taserId, vacation.id, vacation.nature, vacation.name, vacation.shortKey, vacation.isRequired)
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