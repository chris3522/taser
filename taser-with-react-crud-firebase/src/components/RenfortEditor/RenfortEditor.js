import React, { useEffect, useRef, useReducer, useState } from "react"
import useSWR from "swr"
import { navigate } from "@reach/router"
//import styles from "./RenfortEditor.module.css"
import * as api_root from "../../api/renforts"
import * as api_root_vacations from "../../api/vacations"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'
import basePath from "../../lib/env"
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'

const BASE = basePath.BASE

const RenfortEditor = ({ user, taserId, className }) => {
    useEffect(() => {
        if (!user) {
            navigate(`${BASE}/admin`)
        }
    }, [user])

    /********************* define renforts state  *********************** */
    const [renforts, dispatchRenforts] = useReducer(reducers.renforts, [])

    /***********************init renforts state************************* */
    const swrKey = `/admin/${taserId}/renforts`
    const { data: dataRenforts, error: errorRenforts, mutate: mutateRenforts } = useSWR([taserId, swrKey], api_root.getRenforts)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        !firstInit && dataRenforts && dispatchRenforts(actions.initState(dataRenforts.renforts))
    }, [dataRenforts, firstInit])

    /******************update state with new renforts******************** */
    useEffect(() => {
        let stateData = { renforts: renforts }
        if (firstInit) {
            api_root.createRenforts({ taserId, stateData })
            mutateRenforts(stateData, false)
        }
        return () => { stateData = {} }
    }, [renforts, firstInit, taserId, mutateRenforts])


    const inputTaserRenfort = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (taserId) {
            const newData0 = JSON.parse(inputTaserRenfort.current.value)
            const taserRenfortId = newData0.id
            const vacations = await api_root_vacations.getVacations(taserId)
            const requiredVacations = vacations.vacations.reduce((acc, vacation) => {
                if (vacation && vacation.isRequired === "required") {
                    acc.push(vacation.name)
                }
                return acc
            }, [])

            const newData = {
                taserId: taserRenfortId,
                name: newData0.name,
                desc: newData0.desc,
                adminUid: newData0.adminUid,
                targetRequiredVacationsArray: requiredVacations
            }
            if (!firstInit) { setFirstInit(true) }
            const result = dataRenforts.renforts.filter(renfort => renfort.taserId === newData.taserId)
            if (result.length > 0) {
                alert("Ce tableau a déjà été ajouté!")
            }
            else {
                dispatchRenforts(actions.addRTaser(newData))
            }
        }
    }


    if (errorRenforts) return <p>Error loading data!</p>
    else if (!dataRenforts) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" onSubmit={handleSubmit} inputRef1={inputTaserRenfort} taserId={taserId} />
                <table>
                    <thead><tr><th>id</th><th>nom</th><th></th></tr></thead>
                    <tbody>
                        {dataRenforts.renforts.map((renfort) => {
                            return (
                                <tr key={renfort.id}>
                                    <td> {renfort.id}</td><td>{renfort.name}</td>
                                    <td><Icon
                                        name="delete"
                                        theme="light"
                                        size="small"
                                        onClick={() => {
                                            if (!firstInit) { setFirstInit(true) }
                                            dispatchRenforts(actions.removeRTaser(renfort))
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