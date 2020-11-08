import React, { useEffect, useRef } from "react"
import useSWR, { mutate } from "swr"
import { navigate } from "@reach/router"
//import styles from "./RenfortEditor.module.css"
import * as api_root from "../../api/renforts"
import * as api_root_vacations from "../../api/vacations"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'
import basePath from "../../lib/env"

const BASE = basePath.BASE

const RenfortEditor = ({ user, taserId, className }) => {
    useEffect(() => {
        if (!user) {
            navigate(`${BASE}/admin`)
        }
    }, [user])

    const swrKey = `/admin/${taserId}/renforts`
    const { data, error } = useSWR([taserId, swrKey], api_root.getRenforts)
    const inputTaserRenfort = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (taserId) {
            const newData = JSON.parse(inputTaserRenfort.current.value)
            const taserRenfortId = newData.id
            const requiredVacations = await api_root_vacations.getIsrequiredVacationsNumber(taserId)
            delete newData["id"]
            const newData2={taserId:taserRenfortId, ...requiredVacations, ...newData}
            const result = data.filter(renfort => renfort.taserId === newData2.taserId)
            result.length > 0 ? alert ("Ce tableau est déjà crée!") : api_root.createTaserRenfort(taserId,newData2)
                .then(() => mutate([taserId, swrKey]))
        }
    }


    if (error) return <p>Error loading data!</p>
    else if (!data) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" onSubmit={handleSubmit} inputRef1={inputTaserRenfort} taserId={taserId}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th></th></tr></thead>
                    <tbody>
                        {data.map((renfort) => {
                            return (
                                <tr key={renfort.id}>
                                    <td> {renfort.id}</td><td>{renfort.name}</td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            api_root.deleteTaserRenfort(taserId, renfort.id).then(() => mutate([taserId, swrKey]))
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

export default RenfortEditor