import React, { useEffect, useRef, useState, useReducer } from "react"
import useSWR from "swr"
import { navigate } from "@reach/router"
import "./VacationEditor.css"
import * as api_root from "../../api/vacations"
import Icon from "react-crud-icons"
import '../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css'
import CrudForm from './CrudForm'
import * as reducers from './Reducer/reducers'
import * as actions from './Reducer/actions'

const VacationEditor = ({ user, taserId, className }) => {
    useEffect(() => {
        if (!user) {
            navigate("/admin")
        }
    }, [user])

    /*********************define users state  *********************** */
    const [isDisplay, setIsDisplay] = useState(true)
    const [vacations, dispatchVacations] = useReducer(reducers.vacations,[])

    /***********************init users state************************* */
    const swrKey = `/admin/${taserId}/vacations` 
    const { data: dataVacations, error: errorVacations, mutate: mutateVacations } = useSWR([taserId, swrKey], api_root.getVacations)
    const [firstInit, setFirstInit] = useState(false)
    useEffect(() => {
        console.log(dataVacations)
        !firstInit && dataVacations && dispatchVacations(actions.initState(dataVacations.vacations))
    }, [dataVacations, firstInit])

    /******************update state with new users******************** */
    useEffect(() => {
        let stateData = {vacations : vacations}
        if(firstInit){
            api_root.createVacations({taserId,stateData})
            mutateVacations(stateData, false)
        }
        return () => {stateData = {}}
    }, [vacations, firstInit, taserId, mutateVacations])

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
            if (!firstInit) {setFirstInit(true)}
            dispatchVacations(actions.addVacation(newData))   
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
        if (!firstInit) {setFirstInit(true)}
        dispatchVacations(actions.updateVacation(newVacationData)) 

        inputModalVacationId.current.value = ""
        inputModalVacationName.current.value = ""
        inputModalVacationShortKey.current.value = ""
        inputModalVacationNature.current.value = ""
        inputModalVacationRequise.current.value = ""
        setIsDisplay(true)
    }

    if (errorVacations) return <p>Error loading data!</p>
    else if (!dataVacations) return <p>Loading...</p>
    else {
        return (
            <div className={className}>
                <CrudForm buttonName="Create" displayForm={isDisplay ? "displayInBlock" : "displayNone"} onSubmit={handleSubmit} inputRef1={inputVacationId} inputRef2={inputVacationNature} inputRef3={inputVacationName} inputRef4={inputVacationShortKey} inputRef5={inputVacationRequise}/>
                <CrudForm buttonName="Update" displayForm={isDisplay ? "displayNone" : "displayInBlock"} onSubmit={updateVacation} inputRef1={inputModalVacationId} inputRef2={inputModalVacationNature} inputRef3={inputModalVacationName} inputRef4={inputModalVacationShortKey} inputRef5={inputModalVacationRequise}/>
                <table>
                    <thead><tr><th>id</th><th>nom</th><th>shortKey</th><th>obligatoire</th><th></th><th></th></tr></thead>
                    <tbody>
                        {dataVacations.vacations.map((vacation) => {
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
                                            if (!firstInit) {setFirstInit(true)}
                                            dispatchVacations(actions.removeVacation(vacation)) 
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